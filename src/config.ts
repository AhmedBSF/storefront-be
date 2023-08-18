import dotenv from "dotenv";

dotenv.config();

const { PORT, BCRYPT_PASSWORD, SALT_ROUNDS, SECRET_TOKEN } = process.env;

export default {
  port: PORT,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  tokenSecret: SECRET_TOKEN,
};
