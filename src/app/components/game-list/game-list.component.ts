import { Component, OnInit } from '@angular/core';
import { IGame } from 'src/app/Interfaces';
import { GameStatusEnum, gameStatusToStringMap } from 'src/app/enums';

@Component({
    selector: 'game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
    public gameList: IGame[] = [];

    public gameStatusToString = gameStatusToStringMap;

    costructor() {
    }

    ngOnInit() {
        this.generateGames(10);
    }

    public onCreateNewGameClick() {
        this.generateGames(1);
    }

    private generateGames(count: number)  {
        for (let i = 0; i < count; i++ ) {
            this.gameList.push({ id: i + 1, status: GameStatusEnum.waitingForOponent})
        }
    }
}
