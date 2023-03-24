import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchUserCheckInsHistoryUseCase } from "@/useCases/factories/makeFetchUserCheckInsHistoryUseCase";

export async function CheckInsHistoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    size: z.coerce.number().default(20),
  });

  const { sub: userId } = request.user;

  const { page, size } = checkInHistoryQuerySchema.parse(request.query);

  const checkInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await checkInsHistoryUseCase.execute({
    userId,
    page,
    size,
  });

  return reply.status(200).send({ checkIns });
}
