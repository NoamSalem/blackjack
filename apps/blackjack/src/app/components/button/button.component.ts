import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type Size = 'regular' | 'big';
type Color = 'primary' | 'secondary' | 'warn';
type Icon = 'cards' | 'joker' | 'restart';

@Component({
  selector: 'blackjack-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() size: Size = 'regular';
  @Input() color: Color = 'primary';
  @Input() icon: Icon = 'cards';
  @Input() disabled: boolean;

  public icons: { [key in Icon]: string } = {
    cards: 'playing-cards',
    joker: 'stand',
    restart: 'restart',
  };
}
