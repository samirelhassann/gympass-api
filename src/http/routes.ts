import { FastifyInstance } from "fastify";

import { authenticate } from "./controllers/authenticateController";
import { profile } from "./controllers/profileController";
import { register } from "./controllers/registerController";
import verifyJwt from "./middlewares/verifyJwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
