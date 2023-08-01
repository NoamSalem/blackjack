import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../types';

@Component({
  selector: 'blackjack-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() set card(card: Card) {
    this._card = card;
    this.cardAsset = `${card.suit.charAt(0)}_${card.value.toLowerCase()}.svg`;
  }
  private _card: Card;
  public cardAsset: string;
  public readonly faceDownAsset = 'url(assets/cards/back.jpg)';

  public get card(): Card {
    return this._card;
  }
}
