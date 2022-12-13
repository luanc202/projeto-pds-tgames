import z from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.post('/user/:id/changestatus', { onRequest: [authenticate] }, async (request, response) => {
    const userChangeSchema = z.object({
      isActive: z.boolean(),
    });
    const userChangeParams = z.object({
      id: z.string(),
    });

    const { id } = userChangeParams.parse(request.params);
    const { isActive } = userChangeSchema.parse(request.body);

    if (!await prisma.user.findUnique({ where: { id: id } })) {
      return response.status(400).send({ message: 'User does not exist' });
    }

    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        isActive: isActive,
      }
    });

    return response.status(200).send({ message: `User status changed to ${isActive}` });
  });

  fastify.get('/users',{ onRequest: [authenticate] }, async (req, res) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
      }
    });

    return res.send(users);
  });

}

