import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ChipColor = 'red' | 'white' | 'blue' | 'green' | 'black';
export interface Chip {
  value: string;
  color: ChipColor;
}
@Component({
  selector: 'blackjack-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() color: ChipColor = 'red';
  @Input() value = '$1';
}
