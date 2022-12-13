import { FastifyRequest } from "fastify";

export async function authenticate(request: FastifyRequest) {
  try {
    await request.jwtVerify();
  } catch (err) {
    request.log.error(err);
    throw new Error("Unauthorized");
  }
}