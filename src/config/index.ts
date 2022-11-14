const config = {
  DATABASE_URL: process.env.DATABASE_URL_DEV,
  PORT: process.env.PORT,
};
console.log(config.DATABASE_URL);

if (process.env.NODE_TEST) {
  config.DATABASE_URL = process.env.DATABASE_URL_TEST;
}

console.log(config.DATABASE_URL);
export default config;
