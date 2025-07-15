export const ROW_SIZE = 3;

export enum PlayerType {
    None,
    Circle,
    Cross
}

export type Vector = {x: number; y: number;};

export class PossibleWin {
    private pos1: Vector;
    private pos2: Vector;
    private pos3: Vector;

    constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        this.pos1 = {x: x1, y: y1};
        this.pos2 = {x: x2, y: y2};
        this.pos3 = {x: x3, y: y3};
    }

    get allPos(): Array<Vector> {
        return [this.pos1, this.pos2, this.pos3];
    }
}

export const ALL_POSSIBLE_WINS: Array<PossibleWin> = [
    // Horizontal wins
    new PossibleWin(0, 0, 1, 0, 2, 0),
    new PossibleWin(0, 1, 1, 1, 2, 1),
    new PossibleWin(0, 2, 1, 2, 2, 2),

    // Vertical wins
    new PossibleWin(0, 0, 0, 1, 0, 2),
    new PossibleWin(1, 0, 1, 1, 1, 2),
    new PossibleWin(2, 0, 2, 1, 2, 2),

    // Diagonal wins
    new PossibleWin(0, 0, 1, 1, 2, 2),
    new PossibleWin(2, 0, 1, 1, 0, 2),
];

export enum WIN_STATUS {
    Circle,
    Cross,
    Draw,
    None
}
