import { TitatoMark as titatoMark } from '../enums/titato-mark.emum';

export interface ITitatoBoardCell {
    index: number;
    value: titatoMark;
}
