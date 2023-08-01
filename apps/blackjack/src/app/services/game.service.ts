import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DealerPlayRes, PlayerHitRes, StartGameRes } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly API_URL = 'http://localhost:3000';
  private gameId: string;

  constructor(private http: HttpClient) {}

  startGame(): Observable<StartGameRes> {
    return this.http
      .get<StartGameRes>(`${this.API_URL}/start-game`)
      .pipe(tap((res) => (this.gameId = res.id)));
  }

  playerHit(): Observable<PlayerHitRes> {
    return this.http.post<PlayerHitRes>(`${this.API_URL}/player/hit`, {
      gameId: this.gameId,
    });
  }

  dealerPlay(): Observable<DealerPlayRes> {
    return this.http.post<DealerPlayRes>(`${this.API_URL}/dealer/play`, {
      gameId: this.gameId,
    });
  }
}
