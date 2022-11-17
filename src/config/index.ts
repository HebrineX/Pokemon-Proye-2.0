const config = {
  DATABASE_URL: process.env.DATABASE_URL_DEV,
  PORT: process.env.PORT,
};

if (process.env.NODE_TEST) {
  config.DATABASE_URL = process.env.DATABASE_URL_TEST;
}
if (process.env.NODE_DEV) {
  config.DATABASE_URL = process.env.DATABASE_URL_DEV;
}

export default config;
