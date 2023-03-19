import { Gym } from "@prisma/client";

import { GymsRepository } from "../gymsRepository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((u) => u.id === gymId);

    return gym ?? null;
  }
}
