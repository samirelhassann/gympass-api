import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import createAndAuthenticateUser from "@/utils/test/createAndAuthenticateUser";

describe("CheckInMetricsController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to return the check-in metrics", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    const userId = profileResponse.body.user.id;

    const { id } = await prisma.gym.create({
      data: {
        title: "gym-01",
        latitude: 1,
        longitude: 1,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: id,
          user_id: userId,
        },
        {
          gym_id: id,
          user_id: userId,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.checkInsCount).toEqual(2);
  });
});
