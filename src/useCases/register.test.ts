import { compare } from "bcryptjs";
import { expect, it, describe } from "vitest";

import { RegisterUseCase } from "./registerUseCase";

describe("Given the registerUseCase", () => {
  it("should hash the user password", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null;
      },

      async create(data) {
        return {
          id: "id",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "upchh2@example.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });
});
