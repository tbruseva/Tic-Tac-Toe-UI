import { GameStatusEnum } from '../enums/game-status.enum';

export interface IGame {
    id: number;
    gameStatus: GameStatusEnum;
}
