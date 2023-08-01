import { Card, CardValue, Deck, Suit } from './types/types';

export function createDeck(): Deck {
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values: CardValue[] = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  const deck: Deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit: suit, value: value });
    }
  }

  return deck;
}

export function shuffle(deck: Deck): Deck {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export function drawCard(deck: Deck): Card {
  return deck.pop();
}

export function drawCards(deck: Deck, numOfCards: number): Card[] {
  const cards: Card[] = [];
  for (let i = 0; i < numOfCards; i++) {
    cards.push(drawCard(deck));
  }

  return cards;
}

export function calculatePoints(hand: Card[]): number {
  let points = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.value === 'A') {
      aces++;
      points += 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      points += 10;
    } else {
      points += parseInt(card.value);
    }
  }

  // If we've busted but have aces, decrease points
  while (points > 21 && aces > 0) {
    points -= 10;
    aces--;
  }

  return points;
}
