import fastify from "fastify";
import { ZodError } from "zod";

import fastifyJwt from "@fastify/jwt";

import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .code(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  } else {
    // TODO: Add more details to the error
  }

  return reply.code(500).send({ message: "Internal server error." });
});
