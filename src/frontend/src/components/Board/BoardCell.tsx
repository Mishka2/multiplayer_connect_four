import { BoardCellIndexInfo, CellState } from "../../utils/Constants";


type BoardCellProps = BoardCellIndexInfo & {
    mouseEnterCell: (cellIndex: BoardCellIndexInfo) => void
    mouseLeaveCell: (cellIndex: BoardCellIndexInfo) => void
    clickedCell: (cellIndex: BoardCellIndexInfo) => void
    cellState: CellState
}

function BoardCell({
    rowIndex,
    colIndex,
    mouseEnterCell,
    mouseLeaveCell,
    clickedCell,
    cellState
}: BoardCellProps) {

    function getCellColor() {
        let backgroundColor = '#000000'
        switch (cellState) {
            case CellState.CurrentUser:
                backgroundColor = '#c44141'
                break;
            case CellState.OtherUser:
                backgroundColor = '#3a65b0'
                break;
            case CellState.InHightlightedRow:
                backgroundColor = '#000000'
                break;
            case CellState.Highlighted:
                backgroundColor = '#7d2828'
                break;
            default:
                backgroundColor = '#242424'
                break
        }
        return backgroundColor
    }

    return (
        <div style={{
            margin: '5px',
            width: '40px',
            height: '40px',
            backgroundColor: getCellColor(),
            borderRadius: '100px',
        }}
            key={rowIndex.toString() + colIndex.toString()}
            onMouseEnter={() => mouseEnterCell({ rowIndex, colIndex })}
            onMouseLeave={() => mouseLeaveCell({ rowIndex, colIndex })}
            onClick={() => clickedCell({ rowIndex, colIndex })}
        >
        </div>
    )
}

export default BoardCell
