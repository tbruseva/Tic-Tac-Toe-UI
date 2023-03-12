import { Component, Input } from '@angular/core';
import { TitatoMark, titatoMarkToStringMap } from '../../enums/titato-mark.emum';

@Component({
    selector: 'titato-board',
    templateUrl: './titato-board.component.html',
    styleUrls: ['./titato-board.component.scss']
})
export class TitatoBoardComponent {
    @Input() public boardCells: TitatoMark[] = new Array(9).fill(TitatoMark.none);
    public markToStringMap = titatoMarkToStringMap;

    public onClickCell(index: number) {
        this.boardCells[index] = TitatoMark.x
    }
}
