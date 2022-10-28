const config = {
  DATABASE_URL: process.env.MONGODBDEV,
  PORT: process.env.PORT,
};

if (process.env.NODE_ENV === 'test') {
  config.DATABASE_URL = process.env.MONGODBTEST;
}

export default config;
