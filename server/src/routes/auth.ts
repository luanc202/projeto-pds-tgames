import z from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, response) => {
    const userInfoSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const user = userInfoSchema.parse(request.body);

    if (await prisma.user.findUnique({ where: { email: user.email } })) {
      return response.status(400).send({ message: 'User already exists' });
    }

    const createUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return response.status(201).send(createUser);
  });

  fastify.post('/login', async (request, response) => {
    const userLoginBody = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const userInfo = userLoginBody.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    if (!user) {
      return response.status(401).send({
        message: 'User not found',
      });
    }

    if (user.password !== userInfo.password) {
      return response.status(401).send({
        message: 'Invalid password',
      });
    }

    const token = fastify.jwt.sign({
      name: user.name,
      email: user.email,
    }, {
      sub: user.id,
      expiresIn: '7 days',
    });

    const respUser = {
      name: user.name,
      role: user.role,
      email: userInfo.email,
    };

    return response.status(200).send({ token, message: "Login successful", user: respUser });
  });
}