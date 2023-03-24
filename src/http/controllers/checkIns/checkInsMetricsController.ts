import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetUserMetricsUseCase } from "@/useCases/factories/makeGetUserMetricsUseCase";

export async function CheckInsMetricsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub: userId } = request.user;

  const checkInsHistoryUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await checkInsHistoryUseCase.execute({
    userId,
  });

  return reply.status(200).send({ checkInsCount });
}
