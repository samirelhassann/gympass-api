import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";

import { CreateGymUseCase } from "./createGymUseCase";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Given the createGymUsecase", () => {
  const createGymUseCasePropsMock = {
    title: "title",
    description: "description",
    phone: "phone",
    latitude: 0,
    longitude: 0,
  };

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({ ...createGymUseCasePropsMock });

    expect(gym.title).toEqual(createGymUseCasePropsMock.title);
  });
});
