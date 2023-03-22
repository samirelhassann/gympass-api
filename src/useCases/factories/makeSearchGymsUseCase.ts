import { PrismaGymsRepository } from "@/repositories/prisma/prismaGymsRepository";

import { SearchGymsUseCase } from "../searchGymsUseCase";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
