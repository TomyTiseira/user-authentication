import * as dotenv from 'dotenv';
dotenv.config();

export const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/',
  SALT_ROUNDS = 10,
  SECRET_JWT,
  REFRESH_TOKEN_SECRET
} = process.env;
