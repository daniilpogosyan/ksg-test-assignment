import { FastifyPluginCallback } from "fastify";
import { BuyItemRoute, GetItemsRoute } from "./routes";

export const ItemModule: FastifyPluginCallback = function (fastify) {
  fastify.register(GetItemsRoute);
  fastify.register(BuyItemRoute);
};
