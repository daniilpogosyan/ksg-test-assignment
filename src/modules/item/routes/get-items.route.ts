import { FastifyPluginCallback } from "fastify";

export const GetItemsRoute: FastifyPluginCallback = function (fastify) {
  fastify.get("/items", (request, reply) => {
    return {
      message: "get items route reached",
    };
  });
};
