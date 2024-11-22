import { FastifyPluginCallback } from "fastify";

export const BuyItemRoute: FastifyPluginCallback = function (fastify) {
  fastify.post<{ Body: { price: number; userId: number } }>(
    "/buy-item",
    {
      schema: {
        body: {
          type: "object",
          required: ["userId", "price"],
          properties: {
            userId: { type: "integer", exclusiveMinimum: 0 },
            price: { type: "number", exclusiveMinimum: 0 },
          },
        },
      },
    },
    (request, reply) => {
      return fastify.itemService.buyItem(
        request.body.userId,
        request.body.price
      );
    }
  );
};
