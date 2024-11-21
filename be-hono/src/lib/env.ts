export const ENV = {
  DB_HOST: process.env.DB_HOST ?? '',
  DB_USER: process.env.DB_USER ?? '',
  DB_PASS: process.env.DB_PASS ?? '',
  DB_NAME: process.env.DB_NAME ?? '',
  DB_PORT: process.env.DB_PORT ?? '',
  USERNAME: process.env.USERNAME ?? '',
  PASSWORD: process.env.PASSWORD ?? '',
};

export type ENV = typeof ENV;

export default ENV;
