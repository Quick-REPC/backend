CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS questions (
  question_number INT NOT NULL,
  title TEXT,
  description TEXT,
  field_constraints JSONB NOT NULL,
  id UUID UNIQUE NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
parent_id UUID REFERENCES questions (id),
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
modified_at TIMESTAMP
);

CREATE OR REPLACE FUNCTION alter_question_sequence_by_insert ()
  RETURNS TRIGGER
  AS $BODY$
DECLARE
  rec record;
BEGIN
  FOR rec IN
  SELECT
    *
  FROM
    questions
  WHERE
    question_number >= NEW.question_number LOOP
      UPDATE
        questions
      SET
        question_number = (rec.question_number + 1)
      WHERE
        id = rec.id;
    END LOOP;
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql
VOLATILE;

CREATE TRIGGER alter_question_sequence_by_insert
  BEFORE INSERT ON questions
  FOR EACH ROW
  EXECUTE PROCEDURE alter_question_sequence_by_insert ();

CREATE OR REPLACE FUNCTION prevent_question_sequence_change_on_update ()
  RETURNS TRIGGER
  AS $BODY$
DECLARE
  rec record;
BEGIN
  IF NEW.question_number <> OLD.question_number THEN
    RAISE EXCEPTION 'You cannot update a question number. Please insert a new question';
  END IF;
  RETURN NEW;
END;

$BODY$
LANGUAGE plpgsql
VOLATILE;

CREATE TRIGGER prevent_question_sequence_change_on_update
  BEFORE UPDATE ON questions
  FOR EACH ROW
  EXECUTE PROCEDURE prevent_question_sequence_change_on_update ();

CREATE OR REPLACE FUNCTION alter_question_sequence_by_delete ()
  RETURNS TRIGGER
  AS $BODY$
DECLARE
  rec record;
BEGIN
  FOR rec IN
  SELECT
    *
  FROM
    questions
  WHERE
    question_number >= OLD.question_number LOOP
      UPDATE
        questions
      SET
        question_number = (rec.question_number - 1)
      WHERE
        id = rec.id;
    END LOOP;
  RETURN OLD;
END;
$BODY$
LANGUAGE plpgsql
VOLATILE;

CREATE TRIGGER alter_question_sequence_by_delete
  AFTER DELETE ON questions
  FOR EACH ROW
  EXECUTE PROCEDURE alter_question_sequence_by_delete ();

CREATE TYPE account_types_enum AS ENUM (
  'free',
  'premium',
  'active',
  'cancelled'
);

CREATE TABLE IF NOT EXISTS users (
  id UUID UNIQUE NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
first_name TEXT,
last_name TEXT,
email TEXT NOT NULL,
phone TEXT,
password TEXT,
account_type account_types_enum NOT NULL DEFAULT 'free',
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
modified_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listings (
  id UUID UNIQUE NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
friendly_name TEXT,
owner UUID REFERENCES users (id) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
modified_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS documents (
  id UUID UNIQUE NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
owner UUID REFERENCES users (id) NOT NULL,
answers JSONB,
completed_at TIMESTAMP,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
modified_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS urls (
  id UUID UNIQUE NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
owner UUID REFERENCES users (id) NOT NULL,
listing_id UUID REFERENCES listings (id),
short_url TEXT,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
modified_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS url_history (
  id UUID REFERENCES urls (id) NOT NULL,
url TEXT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION save_url_history ()
  RETURNS TRIGGER
  AS $BODY$
BEGIN
  IF NEW.short_url <> OLD.short_url THEN
    INSERT INTO url_history (id, url)
    VALUES (OLD.id, OLD.short_url);
  END IF;
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql
VOLATILE;

CREATE TRIGGER save_url_history
  BEFORE UPDATE ON urls
  FOR EACH ROW
  EXECUTE PROCEDURE save_url_history ();

