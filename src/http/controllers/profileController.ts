import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetUserProfileUseCase } from "@/useCases/factories/makeGetUserProfileUseCase";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { sub: userId } = request.user;

  const { user } = await getUserProfile.execute({
    userId,
  });

  return reply
    .status(200)
    .send({ user: { ...user, password_hash: undefined } });
}
