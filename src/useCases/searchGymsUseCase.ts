import { GymsRepository } from "@/repositories/gymsRepository";
import { Gym } from "@prisma/client";

interface SearchGymsUseCaseRequest {
  query: string;
  page?: number;
  size?: number;
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page = 1,
    size = 20,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    {
      const gyms = await this.gymsRepository.searchMany(query, page, size);

      return {
        gyms,
      };
    }
  }
}
