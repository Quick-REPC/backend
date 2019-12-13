# Quick REPC RESTful Backend

This is the backend repo for the quick repc application.

## Installation

To install all of the dependancies, simply run the following command(s):

```
npm install
```

As of version 1.0.0, all dependancies are installed via the above install command. There are no
dependancies that need to be installed globally.

## Setup

The only setup required to get this project running locally is to create a `.env` file at the root
of the project, and include the following variables:

```
# DATABASE CONNECTION INFORMATION
DB_HOST=String
DB_USERNAME=String
DB_PASSWORD=String
DB_PORT=Number
DB_DATABASE=String

# SENTRY KEYS
ENVIRONMENT=String
SENTRY_KEY=String->URL
```

## Scripts

There are a handful of scripts that are run automatically, and you don't need to worry about. Those
scripts are:

```
lint
format
precommit
prettier
validate
```
