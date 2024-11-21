import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { CACHE_MANAGER } from "./cache-manager.const";
import { ICacheManager } from "./cache-manager.interface";
import { InMemoryCacheManager } from "./in-memory-cache-manager";

declare module "fastify" {
  interface FastifyInstance {
    [CACHE_MANAGER]: ICacheManager;
  }
}

export const CacheManagerPlugin: FastifyPluginCallback = fp(function (fastify) {
  fastify.decorate(CACHE_MANAGER, new InMemoryCacheManager());
});
