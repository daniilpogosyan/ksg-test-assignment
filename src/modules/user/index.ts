import { FastifyPluginCallback } from "fastify";
import { CreateUserRoute } from "./routes/create-user.route";

export const UserModule: FastifyPluginCallback = function (fastify) {
  fastify.register(CreateUserRoute);
};
