import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IGame } from 'src/app/interfaces';
import { GameStatusEnum, gameStatusToStringMap } from 'src/app/enums';
import { GameManagerService } from 'src/app/services/game.service';

@Component({
    selector: 'game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
    public gameList: IGame[] = [];

    public gameStatusToString = gameStatusToStringMap;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private _gameService: GameManagerService) {
    }

    ngOnInit() {
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
            .subscribe((result: IGame) => {
                if (result) {
                    this.gameList.push(result);
                }
            });
    }

    private generateGames(count: number)  {
        for (let i = 0; i < count; i++ ) {
            this.gameList.push({ id: i + 1, status: GameStatusEnum.waitingForOponent})
        }
    }
}
