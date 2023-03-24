import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import createAndAuthenticateUser from "@/utils/test/createAndAuthenticateUser";

describe("CreateCheckInController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a checkIn", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { id } = await prisma.gym.create({
      data: {
        title: "gym-01",
        latitude: 1,
        longitude: 1,
      },
    });

    const response = await request(app.server)
      .post(`/check-ins/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: 1,
        longitude: 1,
      });

    expect(response.status).toBe(201);
  });
});
