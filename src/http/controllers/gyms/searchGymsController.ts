import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeSearchGymsUseCase } from "@/useCases/factories/makeSearchGymsUseCase";

export async function SearchGymsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    size: z.coerce.number().default(20),
  });

  const { q, page, size } = searchGymsQuerySchema.parse(request.query);

  const createGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await createGymUseCase.execute({
    query: q,
    page,
    size,
  });

  return reply.status(200).send({ gyms });
}
