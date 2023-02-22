import { Component } from '@angular/core';
import { ITitatoBoardCell } from '../Interfaces/titato-board-cell.interface';
import { TitatoMark, titatoMarkToStringMap } from '../enums/titato-mark.emum';

@Component({
    selector: 'titato-board',
    templateUrl: './titato-board.component.html',
    styleUrls: ['./titato-board.component.scss']
})
export class TitatoBoardComponent {
    public boardCells: TitatoMark[] = new Array(9).fill(TitatoMark.none);
    public markToStringMap = titatoMarkToStringMap;

    public onClickCell(index: number) {
        this.boardCells[index] = TitatoMark.x
    }
}
