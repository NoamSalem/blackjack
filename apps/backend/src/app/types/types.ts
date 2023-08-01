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
