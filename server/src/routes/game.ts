import z from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });
  
    return res.send(games);
  });

  fastify.post('/games', async (req, res) => {
    const createAdParams = z.object({
      title: z.string(),
      imgUrl: z.string(),
    });
    const game = createAdParams.parse(req.body);    

    const createdGame = await prisma.game.create({
      data: {
        title: game.title,
        bannerUrl: game.imgUrl,
      },
    });

    return res.status(201).send(createdGame);
  });
}

