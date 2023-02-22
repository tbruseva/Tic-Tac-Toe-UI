export enum GameStatusEnum {
    notStarted = 0,
    waitingForOponent = 1,
    started = 2,
    finished = 3
}

export const gameStatusToStringMap: Record<GameStatusEnum, string> = {
    [GameStatusEnum.notStarted]: 'Not Started',
    [GameStatusEnum.waitingForOponent]: 'Witing for oponent',
    [GameStatusEnum.started]: 'Started',
    [GameStatusEnum.finished]: 'Finished',
}