import { PrismaCheckInsRepository } from "@/repositories/prisma/prismaCheckInsRepository";

import { ValidateCheckInUseCase } from "../validateCheckInUseCase";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
