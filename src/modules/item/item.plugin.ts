import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { ITEM_SERVICE } from "./item.const";
import { ItemService } from "./item.service";

declare module "fastify" {
  interface FastifyInstance {
    [ITEM_SERVICE]: ItemService;
  }
}

export const ItemServicePlugin: FastifyPluginCallback = fp(function (fastify) {
  fastify.decorate(
    ITEM_SERVICE,
    new ItemService(fastify.skinportRequester, fastify.cacheManager)
  );
});
