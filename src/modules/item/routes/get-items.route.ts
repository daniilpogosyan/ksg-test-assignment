import { FastifyPluginCallback } from "fastify";

export const GetItemsRoute: FastifyPluginCallback = function (fastify) {
  fastify.get("/items", (request, reply) => {
    return fastify.itemService.getItems();
  });
};
