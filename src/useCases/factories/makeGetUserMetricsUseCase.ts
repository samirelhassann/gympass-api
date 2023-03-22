import { PrismaCheckInsRepository } from "@/repositories/prisma/prismaCheckInsRepository";

import { GetUserMetricsUseCase } from "../getUserMetricsUseCase";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
