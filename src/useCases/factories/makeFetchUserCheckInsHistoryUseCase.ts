import { PrismaCheckInsRepository } from "@/repositories/prisma/prismaCheckInsRepository";

import { FetchUserCheckInsHistoryUseCase } from "../fetchUserCheckInsHistoryUseCase";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
