// Angular
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
// Enums
import { TitatoMark, titatoMarkToStringMap } from '../../enums/titato-mark.emum';

@Component({
    selector: 'titato-board',
    templateUrl: './titato-board.component.html',
    styleUrls: ['./titato-board.component.scss']
})
export class TitatoBoardComponent {
    @Input() public playerMark: TitatoMark = TitatoMark.none;
    @Input() public boardCells: TitatoMark[] = new Array(9).fill(TitatoMark.none);
    @Input() public winCells: number[] = [];

    @Output() cellClicked = new EventEmitter<number>();

    public markToStringMap = titatoMarkToStringMap;

    constructor() {
    }

    public onClickCell(cellIndex: number) {
        if (this.boardCells[cellIndex] != TitatoMark.none) {
            return;
        }
        this.cellClicked.emit(cellIndex);
    }
}
