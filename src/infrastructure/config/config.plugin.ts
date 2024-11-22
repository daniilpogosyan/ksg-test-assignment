import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { Config } from "./config";
import { CONFIG } from "./config.const";

declare module "fastify" {
  interface FastifyInstance {
    [CONFIG]: Config;
  }
}

export const ConfigPlugin: FastifyPluginCallback = fp((fastify) => {
  fastify.decorate(CONFIG, new Config());
});
