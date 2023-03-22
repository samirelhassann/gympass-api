import { hash } from "bcryptjs";
import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";
import { GetUserProfileUseCase } from "../getUserProfileUseCase";

let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe("Given the Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should return the user correctly", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 5),
    });

    const { id: userId } = createdUser;

    const { user: userFounded } = await sut.execute({
      userId,
    });

    expect(userFounded).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "johndoe@example.com",
        name: "John Doe",
      })
    );
  });

  it("should throw ResourceNotFound exception when the user not exists with informed id", async () => {
    await expect(() =>
      sut.execute({
        userId: "123121313",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
