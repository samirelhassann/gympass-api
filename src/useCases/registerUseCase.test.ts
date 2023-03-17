import { compare } from "bcryptjs";
import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";
import { RegisterUseCase } from "./registerUseCase";

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Given the registerUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(usersRepository);
  });

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
    const { user } = await sut.execute({
      name: "John Doe",
      email: "upchh2@example.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to register with existing email on database", async () => {
    const userToCreate = {
      name: "John Doe",
      email: "upchh2@example.com",
      password: "123456",
    };

    await sut.execute(userToCreate);

    await expect(() =>
      sut.execute(userToCreate)
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
