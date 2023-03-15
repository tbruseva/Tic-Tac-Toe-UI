import { GameStatusEnum } from '../enums/game-status.enum';
import { IPlayer } from './player.interface';

export interface IGame {
    id: number;
    status: GameStatusEnum;
    players: IPlayer[];
}
