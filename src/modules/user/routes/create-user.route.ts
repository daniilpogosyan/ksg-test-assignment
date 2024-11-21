import { FastifyPluginCallback } from "fastify";

export const CreateUserRoute: FastifyPluginCallback = function (fastify) {
  fastify.post("/user", (request, reply) => {
    return fastify.userService.createUser();
  });
};
