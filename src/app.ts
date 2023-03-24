import fastify from "fastify";
import { ZodError } from "zod";

import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import { env } from "./env";
import { checkInRoutes } from "./http/controllers/checkIns/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes, { prefix: "/gyms" });
app.register(checkInRoutes, { prefix: "/check-ins" });

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
