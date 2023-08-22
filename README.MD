# Getting Started

- install dependencies `yarn`
- In psql create two databases
  - `CREATE DATABASE storefront_dev`
  - `CREATE DATABASE storefront_test`
- In the project terminal run migrations `yarn migrate:up`
- build and run the project `yarn start`

## Run Test

`yarn test`

## Test Build

`yarn build`

## Test Lint

`yarn lint`

## Environment Variables

You can copy these default values, or use your own environment variables.

```bash
PORT=3000
ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=storefront_dev
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
BCRYPT_PASSWORD=secret
SALT_ROUNDS=10
SECRET_TOKEN=mysecret
```

## Dependencies

- bcrypt
- body-parser
- cors
- db-migrate
- express
- pg
- rimraf
- typescript

## Dev dependencies

- cross-env
- dotenv
- jasmine
- ts-node
- tsc-watch
