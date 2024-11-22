import { FastifyPluginCallback } from "fastify";
import { CreateUserRoute } from "./routes/create-user.route";
import { TopUpBalanceRoute } from "./routes/top-up-balance.route";
import { UserServicePlugin } from "./user.plugin";

export const UserModule: FastifyPluginCallback = function (fastify) {
  fastify.register(UserServicePlugin);
  fastify.register(CreateUserRoute);
  fastify.register(TopUpBalanceRoute);
};
