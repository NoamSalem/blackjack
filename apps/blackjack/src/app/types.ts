export interface Card {
  suit: Suit;
  value: CardValue;
}
export type Deck = Card[];
export type CardValue =
  | 'A'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K';
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export interface GameState {
  id: string;
  deck: Deck;
  player: Card[];
  dealer: Card[];
  playerTotal: number;
  dealerTotal: number;
  gameStatus?: string;
}

export interface StartGameRes {
  id: string;
  playerCards: Card[];
  dealerCards: Card[];
}

export interface PlayerHitRes {
  gameStatus: string;
  newCard: Card;
}
export type DealerPlayRes = GameState;
