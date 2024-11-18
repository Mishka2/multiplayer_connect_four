
export enum CellState {
    None,
    InHightlightedRow,
    CurrentUser,
    Highlighted,
    OtherUser
}


export type BoardCellIndexInfo = {
    rowIndex: number;
    colIndex: number;
}

export type BoardCellInformation = BoardCellIndexInfo & {
    originalState: CellState,
    currentState: CellState
}

export const CookieNames = {
    username: "username",
    userId: "userId",
    currentGameCode: "currentGameCode"
}


export type User = {
    id: string
    username: string
}
