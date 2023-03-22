import { PrismaGymsRepository } from "@/repositories/prisma/prismaGymsRepository";

import { FetchNearbyGyms } from "../fetchNearbyGyms";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGyms(gymsRepository);

  return useCase;
}
