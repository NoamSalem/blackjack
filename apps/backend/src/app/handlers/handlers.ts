import { RouteHandlerMethod } from 'fastify';
import { state } from '../state/state';
import { preHandlerHookHandler } from 'fastify/types/hooks';

const startGame: RouteHandlerMethod = async (req, reply) => {
  const newGame = state.startNewGame();

  reply.send({
    playerCards: newGame.player,
    dealerCards: [newGame.dealer[0]],
    id: newGame.id,
  });
};

const playerHit: RouteHandlerMethod = async (req, reply) => {
  const gameId = req.body['gameId'];
  const game = state.playerHit(gameId);
  reply.send({
    newCard: game.player.slice().pop(),
    gameStatus: game.gameStatus,
  });
};

const dealerPlay: RouteHandlerMethod = async (req, reply) => {
  const gameId = req.body['gameId'];
  const game = state.dealerPlay(gameId);
  reply.send(game);
};

const preHandler: preHandlerHookHandler = async (req, reply, next) => {
  const gameId = req.body['gameId'];

  if (state.isGameIdValid(gameId)) {
    next();
  } else {
    reply.code(404);
    reply.send('no game with this id');
  }
};

export default {
  startGame,
  playerHit,
  dealerPlay,
  preHandler,
};
