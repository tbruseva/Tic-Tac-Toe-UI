export enum TitatoMark {
    none = 0,
    x = 1,
    O = 2
};

export const titatoMarkToStringMap: Record<TitatoMark, string> = {
    [TitatoMark.none]: '',
    [TitatoMark.x]: 'X',
    [TitatoMark.O]: 'O'
}