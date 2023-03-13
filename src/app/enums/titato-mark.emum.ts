export enum TitatoMark {
    none = 0,
    X = 1,
    O = 2
};

export const titatoMarkToStringMap: Record<TitatoMark, string> = {
    [TitatoMark.none]: '',
    [TitatoMark.X]: 'X',
    [TitatoMark.O]: 'O'
}