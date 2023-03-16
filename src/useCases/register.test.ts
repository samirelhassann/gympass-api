import { compare } from "bcryptjs";
import { expect, it, describe } from "vitest";

import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";
import { RegisterUseCase } from "./registerUseCase";

describe("Given the registerUseCase", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "upchh2@example.com",
      password: "123456",
    });

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "upchh2@example.com",
        name: "John Doe",
      })
    );
  });

  it("should hash the user password", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "upchh2@example.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to register with existing email on database", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const userToCreate = {
      name: "John Doe",
      email: "upchh2@example.com",
      password: "123456",
    };

    await registerUseCase.execute(userToCreate);

    await expect(() => registerUseCase.execute(userToCreate)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
