import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories/usersRepository";
import { User } from "@prisma/client";

import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    {
      const hasUser = await this.usersRepository.findByEmail(email);

      if (hasUser) {
        throw new UserAlreadyExistsError(email);
      }

      const passwordHash = await hash(password, 5);

      const user = await this.usersRepository.create({
        name,
        email,
        password_hash: passwordHash,
      });

      return { user };
    }
  }
}
