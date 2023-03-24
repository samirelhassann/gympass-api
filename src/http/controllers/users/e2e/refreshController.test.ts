import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe("RefreshTokenController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh the token", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "jondoe@example.com",
      password: "12345678",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "jondoe@example.com",
      password: "12345678",
    });

    const cookies = authResponse.get("Set-Cookie");

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toEqual({
      token: expect.any(String),
    });

    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
