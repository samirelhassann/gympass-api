import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

import { AuthenticateUseCase } from "../authenticateUseCase";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
