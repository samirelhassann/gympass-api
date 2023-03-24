import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeValidateCheckInUseCase } from "@/useCases/factories/makeValidateCheckInUseCase";

export async function ValidateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const createGymUseCase = makeValidateCheckInUseCase();

  await createGymUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
