import { randomUUID } from "crypto";

import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { FindManyNearbyParams, GymsRepository } from "../gymsRepository";
import getDistanceBetweenCoordinates from "@/utils/getDistanceBetweenCoordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((u) => u.id === gymId);

    return gym ?? null;
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((gym) => {
      const receivedLocation = {
        latitude: params.latitude,
        longitude: params.longitude,
      };

      const gymLocation = {
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
      };

      const distance = getDistanceBetweenCoordinates(
        receivedLocation,
        gymLocation
      );

      return distance < 10;
    });
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gymToAdd = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.items.push(gymToAdd);

    return gymToAdd;
  }

  async searchMany(query: string, page = 1, size = 20): Promise<Gym[]> {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * size, page * size);
  }
}
