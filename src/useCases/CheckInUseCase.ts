import { CheckInsRepository } from "@/repositories/checkInsRepository";
import { GymsRepository } from "@/repositories/gymsRepository";
import getDistanceBetweenCoordinates from "@/utils/getDistanceBetweenCoordinates";
import { CheckIn } from "@prisma/client";

import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

const MAX_DISTANCE_IN_KILOMETERS_ALLOWED = 0.1;

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const userLocation = {
      latitude: userLatitude,
      longitude: userLongitude,
    };

    const gymLocation = {
      latitude: Number(gym.latitude),
      longitude: Number(gym.longitude),
    };

    const distance = getDistanceBetweenCoordinates(userLocation, gymLocation);

    if (distance > MAX_DISTANCE_IN_KILOMETERS_ALLOWED) {
      throw new Error();
    }

    const hasCheckIToday = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (hasCheckIToday) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
