import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";

import { CheckInsRepository } from "../checkInsRepository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(checkInId: string): Promise<CheckIn | null> {
    return await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
  }

  async findManyByUserId(
    userId: string,
    page: number,
    size: number
  ): Promise<CheckIn[]> {
    return await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: size,
      skip: (page - 1) * size,
    });
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prisma.checkIn.create({ data });
  }

  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
  }

  async save(data: CheckIn): Promise<CheckIn> {
    return await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
