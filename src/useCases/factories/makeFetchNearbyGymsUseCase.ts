import { PrismaGymsRepository } from "@/repositories/prisma/prismaGymsRepository";

import { FetchNearbyGymsUseCase } from "../fetchNearbyGymsUseCase";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
