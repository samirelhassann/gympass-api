import { GymsRepository } from "@/repositories/gymsRepository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    {
      const userLocation = {
        latitude: userLatitude,
        longitude: userLongitude,
      };

      const gyms = await this.gymsRepository.findManyNearby(userLocation);

      return {
        gyms,
      };
    }
  }
}
