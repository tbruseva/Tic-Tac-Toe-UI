import { GameStatusEnum } from '../enums';
import { TitatoMark } from '../enums/titato-mark.emum';
import { IPlayer } from '.';

export interface ITitatoGame
{
    id: number;
    name: string;
    gameStatus: GameStatusEnum;
    playerX?: IPlayer;
    playerO?: IPlayer;
    grid: TitatoMark[];
    winCells: number[];
    currentMark: TitatoMark;
    gameState: number;
}