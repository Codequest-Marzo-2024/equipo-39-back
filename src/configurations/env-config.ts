import { registerAs } from '@nestjs/config';

const envConfig = () => ({
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    staticPath: process.env.STATIC_PATH,
  },

  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },

  dbPrisma: {
    databaseUrl: process.env.DATABASE_URL,
  },

  pgAdmin: {
    email: process.env.PGADMIN_EMAIL,
    password: process.env.PGADMIN_PASSWORD,
  },

  docker: {
    portPG: process.env.DOCKER_PORT_PG,
    volumePG: process.env.DOCKER_VOLUME_PG,
  },

  discord: {
    botToken: process.env.DISCORD_BOT_TOKEN,
  },

  jwtToken: process.env.JWT_SECRET,
});

export default registerAs('config', envConfig);
