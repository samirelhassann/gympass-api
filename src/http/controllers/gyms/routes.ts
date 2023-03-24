import { FastifyInstance } from "fastify";

import verifyJwt from "@/http/middlewares/verifyJwt";
import verifyUserRole from "@/http/middlewares/verifyUserRole";

import { CreateGymController } from "./createGymController";
import { NearbyGymsController } from "./nearbyGymsController";
import { SearchGymsController } from "./searchGymsController";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get(
    "/search",
    { onRequest: [verifyUserRole("ADMIN")] },
    SearchGymsController
  );
  app.get("/nearby", NearbyGymsController);

  app.post("/", { onRequest: [verifyUserRole("ADMIN")] }, CreateGymController);
}
