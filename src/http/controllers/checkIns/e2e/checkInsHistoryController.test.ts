import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import createAndAuthenticateUser from "@/utils/test/createAndAuthenticateUser";

describe("CheckInsHistoryController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a checkIn", async () => {
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
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: id,
        user_id: userId,
      }),
      expect.objectContaining({
        gym_id: id,
        user_id: userId,
      }),
    ]);
  });
});
