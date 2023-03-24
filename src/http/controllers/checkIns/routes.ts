import { FastifyInstance } from "fastify";

import verifyJwt from "@/http/middlewares/verifyJwt";
import verifyUserRole from "@/http/middlewares/verifyUserRole";

import { CheckInsHistoryController } from "./checkInsHistoryController";
import { CheckInsMetricsController } from "./checkInsMetricsController";
import { CreateCheckInController } from "./createCheckInController";
import { ValidateCheckInController } from "./validateCheckInController";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/history", CheckInsHistoryController);
  app.get("/metrics", CheckInsMetricsController);

  app.post("/:gymId", CreateCheckInController);
  app.patch(
    "/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    ValidateCheckInController
  );
}
