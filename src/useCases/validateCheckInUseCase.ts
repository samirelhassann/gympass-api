import dayjs from "dayjs";

import { CheckInsRepository } from "@/repositories/checkInsRepository";
import { CheckIn } from "@prisma/client";

import { LateCheckInValidationError } from "./errors/lateCheckInValidationError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    const isDiffTimeNotAllowed = distanceInMinutesFromCheckInCreation > 20;

    if (isDiffTimeNotAllowed) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
