DROP TRIGGER alter_question_sequence_by_insert ON questions;

DROP FUNCTION alter_question_sequence_by_insert;

DROP TRIGGER prevent_question_sequence_change_on_update ON questions;

DROP FUNCTION prevent_question_sequence_change_on_update;

DROP TRIGGER alter_question_sequence_by_delete ON questions;

DROP FUNCTION alter_question_sequence_by_delete;

DROP TABLE IF EXISTS questions;

DROP TRIGGER save_url_history ON urls;

DROP FUNCTION save_url_history;

DROP TABLE IF EXISTS url_history;

DROP TABLE IF EXISTS urls;

DROP TABLE IF EXISTS documents;

DROP TABLE IF EXISTS listings;

DROP TABLE IF EXISTS users;

DROP TYPE account_types_enum;

DROP EXTENSION IF EXISTS "uuid-ossp";

