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
  
    return {games};
  });
}

