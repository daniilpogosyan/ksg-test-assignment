import { FastifyPluginCallback } from "fastify";
import { ItemServicePlugin } from "./item.service";
import { BuyItemRoute, GetItemsRoute } from "./routes";

export const ItemModule: FastifyPluginCallback = function (fastify) {
  fastify.register(ItemServicePlugin);
  fastify.register(GetItemsRoute);
  fastify.register(BuyItemRoute);
};