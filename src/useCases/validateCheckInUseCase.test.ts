import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";

import { LateCheckInValidationError } from "./errors/lateCheckInValidationError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { ValidateCheckInUseCase } from "./validateCheckInUseCase";

let checkInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Given the Validate Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the check in", async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    const { checkIn: validatedCheckIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(validatedCheckIn).toEqual(
      expect.objectContaining({
        gym_id: "gym-1",
        user_id: "user-1",
        validated_at: expect.any(Date),
      })
    );
  });

  it("should NOT be able to validate a inexistent check in", async () => {
    await checkInRepository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    await expect(() =>
      sut.execute({
        checkInId: "test",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should NOT be able to validate a check in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const { id: createdCheckInId } = await checkInRepository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckInId,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
