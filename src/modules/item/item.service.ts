import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { ITEM_SERVICE } from "./item.const";

export class ItemService {
  getItems() {
    return [1, 2, 3];
  }

  buyItem() {
    return true;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    [ITEM_SERVICE]: ItemService;
  }
}

export const ItemServicePlugin: FastifyPluginCallback = fp(function (fastify) {
  fastify.decorate(ITEM_SERVICE, new ItemService());
});
