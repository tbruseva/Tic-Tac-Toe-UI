// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Rxjs
import { map, Observable } from 'rxjs';
// Interfaces
import { IGame, ITitatoGame } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class TicTacToeGameService {
    private _gameApi = 'https://localhost:7081'

    constructor(private _httpClient: HttpClient) {
    }

    public getGameById(gameId: number): Observable<ITitatoGame> {
        return this._httpClient.get(`${this._gameApi}/TicTacToe/${gameId}`, {}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    public makeMove(playerId: number, gameId: number, rowPosition: number, colPosition: number): Observable<ITitatoGame> {
        const headers = new HttpHeaders()
            .set('playerId', playerId.toString())
            .set('gameId', gameId.toString())
            .set('rowPosition', rowPosition.toString())
            .set('colPosition', colPosition.toString());
        return this._httpClient.post(`${this._gameApi}/TicTacToe/MakeMove`, null, {headers}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

}