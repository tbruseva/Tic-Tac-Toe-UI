import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// RxJs
import { Subject, takeUntil, interval } from 'rxjs';

// Interfaces
import { ITitatoGame, IPlayer } from 'src/app/interfaces';
import { TitatoMark, titatoMarkToStringMap } from 'src/app/enums';
// Services
import { TicTacToeGameService } from 'src/app/services/tic-tac-toe-game.service';

@Component({
  selector: 'titato-playground',
  templateUrl: './titato-playground.component.html',
})
export class TitatoPlaygroundComponent implements OnInit, OnDestroy {
    public boardCells: TitatoMark[] = new Array(9).fill(TitatoMark.none);
    public winCells: number[] = [];
    public yourPlayer?: IPlayer;
    public oponentPlayer?: IPlayer;
    public yourMark: TitatoMark = TitatoMark.none;
    public oponentMark: TitatoMark = TitatoMark.none;
    public markToStringMap = titatoMarkToStringMap;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    private _gameId: number = 0;
    private _currentGameState: number = 0

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _titatoService: TicTacToeGameService ) {
    }

    public ngOnInit() {
        this._activatedRoute.params.pipe(takeUntil(this._ngUnsubscribe)).subscribe((param: any) => {
            if (param.gameId) {
                this._gameId = param.gameId;
                this.loadGameData(this._gameId);
            }
        });

        const myObservable = interval(2000); 
        myObservable.pipe(takeUntil(this._ngUnsubscribe)).subscribe(() => { 
            this._titatoService.getGameStateById(this._gameId)
            .pipe(
                takeUntil(this._ngUnsubscribe))
            .subscribe((state: number) => {
                if (state !== this._currentGameState) {
                    this.loadGameData(this._gameId);
                }
            })
        });        
    }

    public ngOnDestroy() {
        this._ngUnsubscribe.next();
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

    public onRestartGameClick() {
        if(!this.yourPlayer) {
            return;
        }
        this._titatoService.restartGame(this._gameId, this.yourPlayer.id)
        .pipe(
            takeUntil(this._ngUnsubscribe))
        .subscribe((game: ITitatoGame) => {
            if (game) {
                this.boardCells = game.grid;
            }
        });
    }   
 
    private loadGameData(gameId: number) {
        this._titatoService.getGameById(gameId)
        .pipe(
            takeUntil(this._ngUnsubscribe))
        .subscribe((game: ITitatoGame) => {
            if (game) {
                this.boardCells = game.grid;
                this.winCells = game.winCells;
                this._currentGameState = game.gameState;

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
}
