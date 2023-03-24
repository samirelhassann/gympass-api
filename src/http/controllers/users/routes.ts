import { FastifyInstance } from "fastify";

import verifyJwt from "../../middlewares/verifyJwt";
import { AuthenticateController } from "./authenticateController";
import { ProfileController } from "./profileController";
import { RefreshController } from "./refreshController";
import { RegisterController } from "./registerController";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", RegisterController);
  app.post("/sessions", AuthenticateController);

  app.patch("/token/refresh", RefreshController);

  // Authenticated
  app.get("/me", { onRequest: [verifyJwt] }, ProfileController);
}
