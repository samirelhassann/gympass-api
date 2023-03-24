import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import createAndAuthenticateUser from "@/utils/test/createAndAuthenticateUser";

describe("SearchGymsController (e2e)", () => {
  const mockGymToCreate = {
    title: "search-mock-gym-01",
    description: "gym-01",
    phone: "123",
    latitude: 1,
    longitude: 1,
  };

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list gyms by title", async () => {
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
      });

    const searchGymsResponse = await request(app.server)
      .get("/gyms/search")
      .set("Authorization", `Bearer ${token}`)
      .query({ q: "gym", page: 1 })
      .send();

    expect(searchGymsResponse.statusCode).toEqual(200);
    expect(searchGymsResponse.body.gyms).toHaveLength(2);
  });
});
