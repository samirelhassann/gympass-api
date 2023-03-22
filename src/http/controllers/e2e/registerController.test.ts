import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe("RegisterController e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a new user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "jondoe@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(201);
  });
});
