import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import handlers from '../handlers/handlers';
export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/',
    async function (request: FastifyRequest, reply: FastifyReply) {
      return { message: 'Hello API' };
    }
  );
  fastify.get('/start-game', handlers.startGame);
  fastify.post(
    '/player/hit',
    { preHandler: [handlers.preHandler] },
    handlers.playerHit
  );
  fastify.post(
    '/dealer/play',
    { preHandler: [handlers.preHandler] },
    handlers.dealerPlay
  );
}
