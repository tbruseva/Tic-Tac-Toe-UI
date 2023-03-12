import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil, finalize } from 'rxjs';

import { IGame, IPlayer } from 'src/app/interfaces';
import { GameStatusEnum, gameStatusToStringMap } from 'src/app/enums';
import { GameManagerService } from 'src/app/services/game.service';

@Component({
    selector: 'game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
    public gameList: IGame[] = [];
    public player: IPlayer | undefined;
    
    public gameStatusToString = gameStatusToStringMap;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _router: Router,
        private _gameService: GameManagerService) {
    }

    ngOnInit() {
        const playerId = localStorage.getItem('playerId');

        if (playerId) {
            this._gameService.getPlayerById(playerId)
                .pipe(
                    takeUntil(this._ngUnsubscribe),
                    finalize(() => {
                        if (!this.player)
                        this.createPlayer();
                    }))
                .subscribe((player: IPlayer) => {
                    if (player) {
                        this.player = player;
                    }
                });
        } else {
            this.createPlayer();
        }
         
        this._gameService.getAllGames()
            .pipe(
                takeUntil(this._ngUnsubscribe))
            .subscribe((result: IGame[]) => {
                if (result) {
                    this.gameList = result;
                }
            });
    }

    public onCreateNewGameClick() {
        this._gameService.createGame()
            .pipe(
                takeUntil(this._ngUnsubscribe))
            .subscribe((newGame: IGame) => {
                if (newGame) {
                    this.joinGame(newGame.id, this.player)                }
            });
    }

    public onJoinGameClick(gameId: number) {
        this.joinGame(gameId, this.player);
    }

    private joinGame(gameId: number, player?: IPlayer) {
        if (!player) {
            return;
        }
        this._gameService.joinGame(gameId, player.id)
            .pipe(
                takeUntil(this._ngUnsubscribe))
            .subscribe((newGame: IGame) => {
                if (newGame) {
                    this._router.navigate([`game`, newGame.id ])
                }
            });
    }

    private createPlayer() {
        if (!this.player) {
            this._gameService.createPlayer()
            .pipe(
                takeUntil(this._ngUnsubscribe))
            .subscribe((player: IPlayer) => {
                if (player) {
                    this.player = player;
                    localStorage.setItem('playerId', player.id.toString());
                }
            });
        }
    }
}
