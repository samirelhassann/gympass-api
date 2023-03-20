import { it, describe, beforeEach, expect } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { SearchGymsUseCase } from "./searchGymsUseCase";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Given the SearchGymsUseCase", () => {
  const createGymUseCasePropsMock = {
    title: "gym-01",
    description: "description",
    phone: "phone",
    latitude: 0,
    longitude: 0,
  };

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should return the correct gyms by title", async () => {
    await gymsRepository.create({ ...createGymUseCasePropsMock });

    await gymsRepository.create({
      ...createGymUseCasePropsMock,
      title: "gym-02",
    });

    await gymsRepository.create({
      ...createGymUseCasePropsMock,
      title: "test",
    });

    const { gyms } = await sut.execute({ query: "gym" });

    expect(gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: "gym-01",
      }),
      expect.objectContaining({
        id: expect.any(String),
        title: "gym-02",
      }),
    ]);
  });

  it("should return the correct gyms by title and with the correct pagination", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        ...createGymUseCasePropsMock,
        title: `gym-${i}`,
      });
    }
    const { gyms } = await sut.execute({ query: "gym", page: 2 });

    expect(gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: "gym-21",
      }),
      expect.objectContaining({
        id: expect.any(String),
        title: "gym-22",
      }),
    ]);
  });
});
