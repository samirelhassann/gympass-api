import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import createAndAuthenticateUser from "@/utils/test/createAndAuthenticateUser";

describe("NearbyGymsController (e2e)", () => {
  const mockGymToCreate = {
    title: "search-mock-gym-01",
    description: "gym-01",
    phone: "123",
    latitude: -6.7883132,
    longitude: 39.2470367,
  };

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...mockGymToCreate });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...mockGymToCreate,
        title: "search-mock-gym-02",
        description: "search-mock-gym-02",
        latitude: -6.7884251,
        longitude: 39.2645006,
      });

    const searchGymsResponse = await request(app.server)
      .get("/gyms/nearby")
      .set("Authorization", `Bearer ${token}`)
      .query({ latitude: -6.7883132, longitude: 39.2470367 })
      .send();

    expect(searchGymsResponse.statusCode).toEqual(200);
    expect(searchGymsResponse.body.gyms).toHaveLength(2);
  });
});
