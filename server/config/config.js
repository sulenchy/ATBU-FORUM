import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    user: process.env.LOCAL_DATABASE_USERNAME,
    host: process.env.LOCAL_DATABASE_HOST,
    database: process.env.LOCAL_DATABASE_NAME,
    password: process.env.LOCAL_DATABASE_PASSWORD,
    port: process.env.LOCAL_DATABASE_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
  },
  test: {
    user: process.env.TEST_DATABASE_USERNAME,
    host: process.env.TEST_DATABASE_HOST,
    database: process.env.TEST_DATABASE_NAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    port: process.env.TEST_DATABASE_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
  },
  production: {
    user: process.env.PRODUCTION_DATABASE_USERNAME,
    host: process.env.PRODUCTION_DATABASE_HOST,
    database: process.env.PRODUCTION_DATABASE_NAME,
    password: process.env.PRODUCTION_DATABASE_PASSWORD,
    port: process.env.PRODUCTION_DATABASE_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
  }
};

export default config;
