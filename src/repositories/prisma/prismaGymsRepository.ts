import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";

import { FindManyNearbyParams, GymsRepository } from "../gymsRepository";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    return await prisma.gym.findUnique({ where: { id } });
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    const { latitude, longitude } = params;

    return await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
  }

  async searchMany(query: string, page: number, size: number): Promise<Gym[]> {
    return await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: size,
      skip: (page - 1) * size,
    });
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return await prisma.gym.create({ data });
  }
}
