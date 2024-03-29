## Quick Start

To run the project and test it quickly, rename the .env.sample file to .env and then execute the command

```bash
yarn start:dev
```

# Description

## Database Synchronization

This feature is used to automatically synchronize your entities (data models) with the database. To activate, simply change the DATABASE_SYNCHRONIZE environment variable to true.

## File Importation to the Database

- The importation is automatically performed whenever the application starts.
- The file sought for import is named `movielist.csv` and must be located in the main project folder next to the `.env` files.
- If you wish to clear all imports, use the start:clean command.

## Development

To start the project in development mode, execute the following commands:

```bash
yarn start:dev
```

To execute in development mode with a clean base from previous imports, use the command below:

```bash
yarn start:cleanDev
```

## Migrations

Migrations can be used if the DATABASE_SYNCHRONIZE environment variable is set to false.

```bash
yarn migration:run
```

to create a new migration use the command changing {name_table} to the name of the table

```bash
yarn migration:generate src/common/database/migrations/{name_table}
```

## Environment

| Variable             | Description                             | Required |
| -------------------- | --------------------------------------- | -------- |
| DATABASE_SYNCHRONIZE | Activates synchronization with entities | no       |
| DATABASE_PATH        | Location of the SQLite database         | yes      |

# Test

## File Import

Tests have been created for the file import functionality. They will test the import feature based on a file located at `src/common/test/movielist.csv`.

## How to Execute Tests

Execute the following command in your terminal:

```bash
yarn test
```

## Data

the data is generated on default path `src\common\database\sql`, change te DATABASE_PATH if you want to change the database path.
