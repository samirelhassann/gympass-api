import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";

import { FetchNearbyGymsUseCase } from "../fetchNearbyGymsUseCase";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Given the FetchNearbyGyms", () => {
  const createGymUseCasePropsMock = {
    title: "gym-01",
    description: "description",
    phone: "phone",
    latitude: -6.7883132,
    longitude: 39.2470367,
  };

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be return gyms at 10 km of distance between the requested location", async () => {
    await gymsRepository.create({ ...createGymUseCasePropsMock });

    await gymsRepository.create({
      ...createGymUseCasePropsMock,
      title: "gym-02",
      latitude: -6.7884251,
      longitude: 39.2645006,
    });

    await gymsRepository.create({
      ...createGymUseCasePropsMock,
      title: "gym-03",
      latitude: 40.6892494,
      longitude: -74.0466891,
    });

    const searchLocation = {
      userLatitude: -6.7883132,
      userLongitude: 39.2470367,
    };

    const { gyms } = await sut.execute(searchLocation);

    expect(gyms).toEqual([
      expect.objectContaining({
        title: "gym-01",
      }),
      expect.objectContaining({
        title: "gym-02",
      }),
    ]);
  });
});
