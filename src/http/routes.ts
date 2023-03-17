import { FastifyInstance } from "fastify";

import { authenticate } from "./controllers/authenticateController";
import { register } from "./controllers/registerController";

export async function appRoutes(app: FastifyInstance){
  app.post("/users", register);
  app.post("/sessions", authenticate);
}
