// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
// Rxjs
import { map, Observable, of } from 'rxjs';
// Interfaces
import { IGame } from '../interfaces';
import { GameStatusEnum } from '../enums';

@Injectable({
    providedIn: 'root',
})
export class GameManagerService {
    private _gameApi = 'https://localhost:7081'

    constructor(private _httpClient: HttpClient) {
    }

    public getAllGames(): Observable<IGame[]> {
        return this._httpClient.get(`${this._gameApi}/Game/allGames`, {}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    public createGame(): Observable<IGame> {
        return this._httpClient.post(`${this._gameApi}/TicTacToe/CreateGame`, {}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }
}
