import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { Postgres } from "./postgres";
import { POSTGRES } from "./postgres.const";

declare module "fastify" {
  interface FastifyInstance {
    [POSTGRES]: Postgres;
  }
}

export const PostgresPlugin: FastifyPluginCallback = fp(function (fastify) {
  fastify.decorate(
    POSTGRES,
    new Postgres({ connectionString: fastify.config.DATABASE_URL })
  );
});
