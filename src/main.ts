import Fastify from "fastify";

const fastify = Fastify();

fastify.post("/buy", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
  }
});
