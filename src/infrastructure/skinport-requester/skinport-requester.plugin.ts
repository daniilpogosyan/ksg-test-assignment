import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { SkinportRequester } from "./skinport-requester";
import { SKINPORT_REQUESTER } from "./skinport-requester.const";
import { ISkinportRequester } from "./skinport-requester.interface";

declare module "fastify" {
  interface FastifyInstance {
    [SKINPORT_REQUESTER]: ISkinportRequester;
  }
}

export const SkinportRequesterPlugin: FastifyPluginCallback = fp(function (
  fastify
) {
  fastify.decorate(SKINPORT_REQUESTER, new SkinportRequester());
});
