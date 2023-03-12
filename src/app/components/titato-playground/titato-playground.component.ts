import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// RxJs
import { Subject, takeUntil } from 'rxjs';


import { GameManagerService } from 'src/app/services/game.service';
import { ITitatoGame, IPlayer } from 'src/app/interfaces';
import { TitatoMark } from 'src/app/enums';

@Component({
  selector: 'titato-playground',
  templateUrl: './titato-playground.component.html',
})
export class TitatoPlaygroundComponent implements OnInit {
    public boardCells: TitatoMark[] = new Array(9).fill(TitatoMark.none);
    public yourPlayer?: IPlayer;
    public oponentPlayer?: IPlayer;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();
   
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _gameService: GameManagerService) {

    }

    public ngOnInit() {
        this._activatedRoute.params.pipe(takeUntil(this._ngUnsubscribe)).subscribe((param: any) => {
            if (param.gameId) {
                this._gameService.getGameById(param.gameId)
                .pipe(
                    takeUntil(this._ngUnsubscribe))
                .subscribe((game: ITitatoGame) => {
                    if (game) {
                        this.boardCells = game.grid;

                        const playerId = localStorage.getItem('playerId');

                        if (playerId == game.playerX?.id.toString()) {
                            this.yourPlayer = game.playerX;
                            this.oponentPlayer = game.playerO;
                        } else if (playerId == game.playerO?.id.toString()) {
                            this.yourPlayer = game.playerO;
                            this.oponentPlayer = game.playerX;
                        }

                    }
                });
            }
        });
    }

    public ngOnDestroy() {
        this._ngUnsubscribe.complete();
    }
}
