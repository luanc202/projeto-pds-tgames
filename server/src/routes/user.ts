import z from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/me', async (request, response) => {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const body: any = createUserBody.parse(request.body);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    return response.status(201).send(user);
  });

  fastify.post('/login', async (request, response) => {
    const createLoginBody = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const body: any = createLoginBody.parse(request.body);

    const userLogin = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!userLogin) {
      return response.status(401).send({
        message: 'User not found',
      });
    }

    if (userLogin.password !== body.password) {
      return response.status(401).send({
        message: 'Invalid password',
      });
    }

    return response.status(201).send({ message: "Login successful" });
  });
}