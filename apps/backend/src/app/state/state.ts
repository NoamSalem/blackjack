import { Card, Deck } from '../types/types';
import {
  calculatePoints,
  createDeck,
  drawCard,
  drawCards,
  shuffle,
} from '../game';
import { timer } from 'rxjs';
import { v4 } from 'uuid';

interface GameState {
  id: string;
  deck: Deck;
  player: Card[];
  dealer: Card[];
  gameStatus?: string;
}

class State {
  private _games: Map<string, GameState>;
  constructor() {
    this._games = new Map();
  }

  public startNewGame(): GameState {
    const id = v4();
    const deck = shuffle(createDeck());
    const dealer = drawCards(deck, 2);
    const player = drawCards(deck, 2);
    const game: GameState = {
      dealer,
      player,
      deck,
      id,
      gameStatus: 'ongoing',
    };

    this._games.set(id, game);

    return game;
  }

  public playerHit(gameId: string): GameState | never {
    const game = this._games.get(gameId);
    if (!game) throw new Error('no game with this id');

    game.player.push(drawCard(game.deck));

    if (calculatePoints(game.player) > 21) {
      game.gameStatus = 'dealerWins';
    }

    return game;
  }

  public dealerPlay(gameId: string): GameState | never {
    const game = this._games.get(gameId);
    if (!game) throw new Error('no game with this id');

    while (calculatePoints(game.dealer) < 17) {
      game.dealer.push(drawCard(game.deck));
    }

    const dealerPoints = calculatePoints(game.dealer);
    const playerPoints = calculatePoints(game.player);

    // Check if the dealer loses
    if (dealerPoints > 21) {
      game.gameStatus = 'playerWins';
    } else if (dealerPoints >= playerPoints) {
      game.gameStatus = 'dealerWins';
    } else {
      game.gameStatus = 'playerWins';
    }

    timer(2000).subscribe(() => this._games.delete(gameId));

    return game;
  }

  public isGameIdValid(gameId: string): boolean {
    return this._games.has(gameId);
  }
}

export const state = new State();
