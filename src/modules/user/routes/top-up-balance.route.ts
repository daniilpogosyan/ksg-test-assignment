import { FastifyPluginCallback } from "fastify";

export const TopUpBalanceRoute: FastifyPluginCallback = function (fastify) {
  fastify.post<{ Body: { userId: number; amount: number } }>(
    "/top-up-balance",
    {
      schema: {
        body: {
          type: "object",
          required: ["userId", "amount"],
          properties: {
            userId: { type: "integer", exclusiveMinimum: 0 },
            amount: { type: "number", exclusiveMinimum: 0 },
          },
        },
      },
    },
    (request, reply) => {
      return fastify.userService.topUpBalance(
        request.body.userId,
        request.body.amount
      );
    }
  );
};
