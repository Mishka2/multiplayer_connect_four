
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
