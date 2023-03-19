import { randomUUID } from "crypto";

import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { GymsRepository } from "../gymsRepository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((u) => u.id === gymId);

    return gym ?? null;
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
}
