import z from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from '../utils/convert-minutes-to-hour-string';

export async function adsRoutes(fastify: FastifyInstance) {
  fastify.post('/games/:id/ads', async (request, response) => {
    const createAdParams = z.object({
      id: z.string(),
    });

    const gameId = createAdParams.parse(request.params).id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,
      },
    })

    return response.status(201).send(ad);
  });

  fastify.get('/games/:id/ads', async (req, res) => {
    const getAdsParams = z.object({
      id: z.string(),
    });

    const gameId = getAdsParams.parse(req.params).id;

    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
        createdAt: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return (ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      }
    }));
  });
}



