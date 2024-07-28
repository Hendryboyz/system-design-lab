export const configuration = () => ({
  app: {
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    domainPrefix: process.env.DOMAIN_PREFIX ?? 'dsebd',
    openAPI: {
      basename: process.env.OPENAPI_BASENAME ?? '',
      enable: process.env.NODE_ENV === 'production' ? false : true,
    },
    enableDeleteAgentVerification: true,
    allowDeleteAgents: ['AGENT_1', 'AGENT_2'],
    hostVerification: false,
  },
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT)
      : 5432,
    username: process.env.DATABASE_USER ?? 'henrychou',
    password: process.env.DATABASE_PASSWORD ?? 'root123',
    database: process.env.DATABASE_NAME ?? 'dsebd-demo',
    /**
     * use auto load entities to avoid breaking module boundary
     * https://docs.nestjs.com/techniques/database#auto-load-entities
     */
    // entities: [ Identity, User ],
    autoLoadEntities: true,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  },
  queue: {
    username: process.env.QUEUE_USERNAME ?? 'user',
    password: process.env.QUEUE_PASSWORD ?? 'bitnami',
    hostname: process.env.QUEUE_HOSTNAME ?? 'localhost',
    port: process.env.QUEUE_PORT ? parseInt(process.env.QUEUE_PORT) : 5672,
  },
  cdc: {
    queue: process.env.CDC_QUEUE ?? 'internal',
  },
});
