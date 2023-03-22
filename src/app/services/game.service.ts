// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Rxjs
import { map, Observable, of } from 'rxjs';
// Interfaces
import { IGame, ITitatoGame, IPlayer } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class GameManagerService {
    private _gameApi = 'https://localhost:7081'

    constructor(private _httpClient: HttpClient) {
    }

    public getAllGames(): Observable<IGame[]> {
        return this._httpClient.get(`${this._gameApi}/Game/Games`, {}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    public createGame(): Observable<IGame> {
        const headers = new HttpHeaders().set('name', 'Tic-Tac-Toe');
        return this._httpClient.post(`${this._gameApi}/Game`, null, {headers}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    public getPlayerById(playerId: number | string): Observable<IPlayer> {
        return this._httpClient.get(`${this._gameApi}/Game/Player/${playerId}`, {}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    public createPlayer(playerName: string = '') {
        const headers = new HttpHeaders().set('username', playerName);
        return this._httpClient.post(`${this._gameApi}/Game/Player`, null, {headers}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }
    
    public joinGame(gameId: number, playerId: number, autoplay: boolean){
        const headers = new HttpHeaders()
        .set('playerId', playerId.toString())
        .set('auto', autoplay.toString());
        return this._httpClient.post(`${this._gameApi}/Game/JoinGame/${gameId}`, null, {headers}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    // public joinGameAgainstComputer(gameId: number, playerId: number) {
    //     const headers = new HttpHeaders()
    //     .set('playerId', playerId.toString())
    //     .set('auto', 'true');
    //     return this._httpClient.post(`${this._gameApi}/Game/JoinGame/${gameId}`, null, {headers}).pipe(
    //         map((res: any) => {
    //             return res;
    //         })
    //     );
    // }
}
