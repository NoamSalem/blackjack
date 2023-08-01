import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Card } from '../../types';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';
import { Chip, ChipComponent } from '../chip/chip.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'blackjack-game',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    ChipComponent,
    MatDialogModule,
    LogoComponent,
  ],
  providers: [GameService],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  public playerCards: Card[] = [];
  public dealerCards: Card[] = [];
  public status = 'Pending start';
  public pendingNewGame = true;
  public chips: Chip[] = [
    { color: 'white', value: '$1' },
    { color: 'red', value: '$5' },
    { color: 'blue', value: '$10' },
    { color: 'green', value: '$25' },
    { color: 'black', value: '$100' },
  ];

  constructor(private gameService: GameService) {}

  startGame(): void {
    this.gameService.startGame().subscribe((response) => {
      this.playerCards = response.playerCards;
      this.dealerCards = response.dealerCards;
      this.pendingNewGame = false;
      this.status = 'Your move';
    });
  }

  playerHit(): void {
    this.gameService.playerHit().subscribe((response) => {
      this.playerCards.push(response.newCard);
      if (response.gameStatus !== 'ongoing') {
        this.endGame(response.gameStatus);
      }
    });
  }

  dealerPlay(): void {
    this.gameService.dealerPlay().subscribe((response) => {
      this.dealerCards = response.dealer;
      this.endGame(response.gameStatus);
    });
  }

  endGame(gameStatus: string): void {
    if (gameStatus === 'dealerWins') {
      this.status = 'Dealer won ☹';
    } else if (gameStatus === 'playerWins') {
      this.status = 'You won!';
    }
    this.pendingNewGame = true;
  }
}
