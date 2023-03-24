import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchNearbyGymsUseCase } from "@/useCases/factories/makeFetchNearbyGymsUseCase";

export async function NearbyGymsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return value >= -90 && value <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return value >= -180 && value <= 180;
    }),
  });

  const { latitude: userLatitude, longitude: userLongitude } =
    nearbyGymsQuerySchema.parse(request.query);

  const createGymUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await createGymUseCase.execute({
    userLatitude,
    userLongitude,
  });

  return reply.status(200).send({ gyms });
}
