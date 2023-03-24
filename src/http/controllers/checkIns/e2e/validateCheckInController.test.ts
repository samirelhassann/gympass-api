import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import createAndAuthenticateUser from "@/utils/test/createAndAuthenticateUser";

describe("ValidateCheckInController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    const userId = profileResponse.body.user.id;

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: "gym-01",
        latitude: 1,
        longitude: 1,
      },
    });

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gymId,
        user_id: userId,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
