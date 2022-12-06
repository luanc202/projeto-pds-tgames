import cors from '@fastify/cors';
import Fastify from 'fastify';
import jwt from "@fastify/jwt";

import { PrismaClient } from '@prisma/client'
import { discordRoutes } from './routes/discord';
import { gameRoutes } from './routes/game';
import { adsRoutes } from './routes/ads';
import { userRoutes } from './routes/auth';
import { stringify } from 'querystring';

const prisma = new PrismaClient({
    log: ['query'],
});

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors,{
        origin: true,
    });

    await fastify.register(jwt, {
        secret: String(process.env.JWT_SECRET),
    });

    fastify.register(discordRoutes);
    fastify.register(adsRoutes);
    fastify.register(gameRoutes);
    fastify.register(userRoutes);

    await fastify.listen({ port: 3333, host: '0.0.0.0' });
}


bootstrap();