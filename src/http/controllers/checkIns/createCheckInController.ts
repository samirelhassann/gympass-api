import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCheckInUseCase } from "@/useCases/factories/makeCheckInUseCase";

export async function CreateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub: userId } = request.user;

  const createCheckInParamsSchema = z.object({
    gymId: z.string(),
  });

  const createGymBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return value >= -90 && value <= 90;
    }),
    longitude: z.number().refine((value) => {
      return value >= -180 && value <= 180;
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const { latitude: userLatitude, longitude: userLongitude } =
    createGymBodySchema.parse(request.body);

  const createGymUseCase = makeCheckInUseCase();

  await createGymUseCase.execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  });

  return reply.status(201).send();
}
