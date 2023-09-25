export interface Player {
    stamina: number,
    name: string,
    hasTurn: boolean,
    executingAction: boolean,
    hasSwapped: boolean,
    force: [number, number]
    healPower: [number, number]
}