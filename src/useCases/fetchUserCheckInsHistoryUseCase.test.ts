import { it, describe, beforeEach, expect } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";

import { FetchUserCheckInsHistoryUseCase } from "./fetchUserCheckInsHistoryUseCase";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Given the FetchUserCheckInsHistoryUseCase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should return all the check ins of the requested userId", async () => {
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

    const checkIns = await sut.execute({ userId: "user-1" });

    expect(checkIns).toEqual({
      checkIns: [
        expect.objectContaining({
          id: expect.any(String),
          gym_id: "gym-1",
          user_id: "user-1",
        }),
        expect.objectContaining({
          id: expect.any(String),
          gym_id: "gym-2",
          user_id: "user-1",
        }),
      ],
    });
  });

  it("should return all the check ins of the requested userId by page", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-1",
      });
    }

    const { checkIns } = await sut.execute({ userId: "user-1", page: 2 });

    expect(checkIns).toHaveLength(2);

    expect(checkIns).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        gym_id: "gym-21",
        user_id: "user-1",
      }),
      expect.objectContaining({
        id: expect.any(String),
        gym_id: "gym-22",
        user_id: "user-1",
      }),
    ]);
  });
});
