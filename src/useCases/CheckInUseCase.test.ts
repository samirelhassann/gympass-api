import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { Decimal } from "@prisma/client/runtime/library";

import { CheckInUseCase } from "./CheckInUseCase";

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Given the CheckIn Use Case", () => {
  const latMock = -6.1645897;
  const longMock = 39.1606324;

  const checkInUseCasePropsMock = {
    userId: "user-1",
    gymId: "gym-1",
    userLatitude: latMock,
    userLongitude: longMock,
  };

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-1",
      title: "gym-1",
      description: "gym-1",
      phone: "123",
      latitude: new Decimal(latMock),
      longitude: new Decimal(longMock),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in correctly", async () => {
    const { checkIn } = await sut.execute({
      ...checkInUseCasePropsMock,
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
      ...checkInUseCasePropsMock,
    });

    await expect(async () => {
      await sut.execute({
        ...checkInUseCasePropsMock,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should be able to given the same user, do 2 check ins on different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      ...checkInUseCasePropsMock,
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      ...checkInUseCasePropsMock,
    });

    expect(checkIn).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user_id: "user-1",
        gym_id: "gym-1",
        created_at: new Date(),
      })
    );
  });

  it("should be able to check in on distant gym ", async () => {
    await expect(() =>
      sut.execute({
        ...checkInUseCasePropsMock,
        userLatitude: -6.1533104,
        userLongitude: 39.219937,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
