import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

import { prisma } from "@/lib/prisma";

const createAndAuthenticateUser = async (
  app: FastifyInstance,
  isAdmin = false
) => {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "jondoe@example.com",
      password_hash: await hash("12345678", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "jondoe@example.com",
    password: "12345678",
  });

  const { token } = authResponse.body;

  return { token };
};

export default createAndAuthenticateUser;
