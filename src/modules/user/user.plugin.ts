import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { USER_SERVICE } from "./user.const";
import { UserService } from "./user.service";

declare module "fastify" {
  interface FastifyInstance {
    [USER_SERVICE]: UserService;
  }
}

export const UserServicePlugin: FastifyPluginCallback = fp(function (fastify) {
  fastify.decorate(USER_SERVICE, new UserService());
});
