import { FastifyReply, FastifyRequest } from "fastify";

const verifyUserRole = (roleToVerify: "ADMIN" | "MEMBER") => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return reply.code(401).send({
        message: "Unauthorized",
      });
    }
  };
};

export default verifyUserRole;
