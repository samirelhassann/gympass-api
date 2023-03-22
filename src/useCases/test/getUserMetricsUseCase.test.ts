import { it, describe, beforeEach, expect } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";

import { GetUserMetricsUseCase } from "../getUserMetricsUseCase";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Given the GetUserMetricsUseCase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get the check ins count by the requested user", async () => {
    await checkInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    await checkInsRepository.create({
      gym_id: "gym-2",
      user_id: "user-1",
    });

    await checkInsRepository.create({
      gym_id: "gym-3",
      user_id: "user-2",
    });

    const userMetrics = await sut.execute({ userId: "user-1" });

    expect(userMetrics).toStrictEqual({ checkInsCount: 2 });
  });
});
