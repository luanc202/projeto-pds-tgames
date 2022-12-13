import z from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function discordRoutes(fastify: FastifyInstance) {
  fastify.get('/ads/:id/discord',{ onRequest: [authenticate] }, async (req, res) => {
    const getDiscordParams = z.object({
      id: z.string(),
    });

    const adId = getDiscordParams.parse(req.params).id;
  
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    });
  
    return {
        discord: ad.discord,
    };
  })
}