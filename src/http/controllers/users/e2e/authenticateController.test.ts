import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe("AuthenticateController e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "jondoe@example.com",
      password: "12345678",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "jondoe@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
