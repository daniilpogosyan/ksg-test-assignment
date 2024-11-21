import Fastify from "fastify";
import { CacheManagerPlugin } from "./infrastructure/cache-manager/cache-manager.plugin";
import { SkinportRequesterPlugin } from "./infrastructure/skinport-requester/skinport-requester.plugin";
import { ItemModule } from "./modules/item/item.module";
import { UserModule } from "./modules/user";

const fastify = Fastify();

fastify.register(CacheManagerPlugin);
fastify.register(SkinportRequesterPlugin);

fastify.register(ItemModule);
fastify.register(UserModule);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
  }
});
