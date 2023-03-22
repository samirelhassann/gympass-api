import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

import { GetUserProfileUseCase } from "../getUserProfileUseCase";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
