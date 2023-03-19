import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";

import { CheckInUseCase } from "./CheckInUseCase";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Given the CheckIn Use Case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in correctly", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    expect(checkIn).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user_id: "user-1",
        gym_id: "gym-1",
      })
    );
  });

  it("should NOT be able to given the same user, do 2 check ins on same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    await expect(async () => {
      await sut.execute({
        userId: "user-1",
        gymId: "gym-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should be able to given the same user, do 2 check ins on different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    expect(checkIn).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user_id: "user-1",
        gym_id: "gym-1",
        created_at: new Date() 
      })
    );
  });
});
