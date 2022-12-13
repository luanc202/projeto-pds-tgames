import z from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

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

  fastify.post('/games',{ onRequest: [authenticate] }, async (req, res) => {
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

  fastify.post('/games/:id',{ onRequest: [authenticate] }, async (req, res) => {
    const gameStatusScheme = z.object({
      isActive: z.boolean(),
    });

    const gameIdParams = z.object({
      id: z.string(),
    });

    const game = gameIdParams.parse(req.params); 
    const status = gameStatusScheme.parse(req.body);   

    await prisma.game.update({
      where: {
        id: game.id,
      },
      data: {
        isActive: status.isActive,
      },
    });

    return res.status(200).send('Game status updated');
  });
}

