import { FastifyPluginCallback } from "fastify";

export const BuyItemRoute: FastifyPluginCallback = function (fastify) {
  fastify.post("/buy-item", (request, reply) => {
    return {
      message: "but item route reached",
    };
  });
};
