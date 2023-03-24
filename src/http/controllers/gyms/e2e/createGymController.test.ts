import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import createAndAuthenticateUser from "@/utils/test/createAndAuthenticateUser";

describe("CreateGymController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "gym-01",
        description: "gym-01",
        phone: "123",
        latitude: 1,
        longitude: 1,
      });

    expect(response.status).toBe(201);
  });
});
