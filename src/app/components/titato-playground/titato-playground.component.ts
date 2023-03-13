import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// RxJs
import { Subject, takeUntil } from 'rxjs';
// Interfaces
import { ITitatoGame, IPlayer } from 'src/app/interfaces';
import { TitatoMark, titatoMarkToStringMap } from 'src/app/enums';
// Services
import { TicTacToeGameService } from 'src/app/services/tic-tac-toe-game.service';
import { GameManagerService } from 'src/app/services/game.service';

@Component({
  selector: 'titato-playground',
  templateUrl: './titato-playground.component.html',
})
export class TitatoPlaygroundComponent implements OnInit, OnDestroy {
    public boardCells: TitatoMark[] = new Array(9).fill(TitatoMark.none);
    public yourPlayer?: IPlayer;
    public oponentPlayer?: IPlayer;
    public yourMark: TitatoMark = TitatoMark.none;
    public oponentMark: TitatoMark = TitatoMark.none;
    public markToStringMap = titatoMarkToStringMap;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    private _gameId: number = 0;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _gameService: GameManagerService,
        private _titatoService: TicTacToeGameService ) {
    }

    public ngOnInit() {
        this._activatedRoute.params.pipe(takeUntil(this._ngUnsubscribe)).subscribe((param: any) => {
            if (param.gameId) {
                this._gameId = param.gameId;
                this._titatoService.getGameById(param.gameId)
                .pipe(
                    takeUntil(this._ngUnsubscribe))
                .subscribe((game: ITitatoGame) => {
                    if (game) {
                        this.boardCells = game.grid;

                        const playerId = localStorage.getItem('playerId');

                        if (playerId == game.playerX?.id.toString()) {
                            this.yourPlayer = game.playerX;
                            this.oponentPlayer = game.playerO;
                            this.yourMark = TitatoMark.X;
                            this.oponentMark = TitatoMark.O;
                        } else if (playerId == game.playerO?.id.toString()) {
                            this.yourPlayer = game.playerO;
                            this.oponentPlayer = game.playerX;
                            this.yourMark = TitatoMark.O;
                            this.oponentMark = TitatoMark.X;
                        }

                    }
                });
            }
        });
    }

    public ngOnDestroy() {
        this._ngUnsubscribe.complete();
    }

    public boardCellClicked(index: any) {
        if(!this.yourPlayer) {
            return;
        }

        const rowIndex = Math.floor(index / 3);
        const colIndex = Math.floor(index - rowIndex * 3);
        this._titatoService.makeMove(this.yourPlayer.id, this._gameId, rowIndex, colIndex)
        .pipe(
            takeUntil(this._ngUnsubscribe))
        .subscribe((game: ITitatoGame) => {
            if (game) {
                this.boardCells = game.grid;
            }
        });
    }
}
