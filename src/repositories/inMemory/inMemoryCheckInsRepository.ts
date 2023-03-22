import { Prisma, CheckIn } from "@prisma/client";

import { CheckInsRepository } from "../checkInsRepository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: "checkIn-" + Math.random().toString(36).substring(7),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const checkIn = this.checkIns.find(
      (c) =>
        c.user_id === userId &&
        c.created_at.toDateString() === date.toDateString()
    );

    return checkIn ?? null;
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    return this.checkIns.find((c) => c.id === checkInId) ?? null;
  }

  async findManyByUserId(
    userId: string,
    page: number,
    size: number
  ): Promise<CheckIn[]> {
    return this.checkIns
      .filter((c) => c.user_id === userId)
      .slice((page - 1) * size, page * size);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter((c) => c.user_id === userId).length;
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.checkIns.findIndex(
      (item) => item.id === checkIn.id
    );

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
