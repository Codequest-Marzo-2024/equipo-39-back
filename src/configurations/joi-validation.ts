import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  app: Joi.object({
    APP_HOST: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    STATIC_PATH: Joi.string().required(),
  }),

  db: Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_DATABASE: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
  }),

  dbPrisma: Joi.object({
    DATABASE_URL: Joi.string().required(),
  }),

  pgAdmin: Joi.object({
    PGADMIN_EMAIL: Joi.string().required(),
    PGADMIN_PASSWORD: Joi.string().required(),
  }),

  docker: Joi.object({
    DOCKER_PORT_PG: Joi.number().required(),
    DOCKER_VOLUME_PG: Joi.string().required(),
  }),

  JWT_SECRET: Joi.string().required(),

  LOGIN_EMAIL: Joi.string().required(),
  LOGIN_PASSWORD: Joi.string().required(),

  DISCORD_BOT_TOKEN: Joi.string().required(),
  DISCORD_ID_SERVER: Joi.string().required(),
});
