import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { InvalidCredentialsError } from "@/useCases/errors/invalidCredentialsError";
import { makeAuthenticateUseCase } from "@/useCases/factories/makeAuthenticateUseCase";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}
