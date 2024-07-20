export const configuration = () => ({
  app: {
    port: process.env.APP_PORT,
    openAPI: {
      basename: process.env.OPENAPI_BASENAME || '/',
      enable: process.env.NODE_ENV === 'production' ? true : false,
    }
  },
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
    username: process.env.DATABASE_USER || 'henrychou',
    password: process.env.DATABASE_PASSWORD || 'root123',
    database: process.env.DATABASE_NAME || 'dsebd-internal',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  },
});