import { useState } from 'react'
import '../../App.css'
import { BoardCellIndexInfo, BoardCellInformation, CellState } from '../../utils/Constants'
import BoardCell from './BoardCell'



function FullBoard() {

    const rows = 6
    const cols = 7
    const [matrix, setMatrix] = useState(() => {
        return Array.from({ length: rows }, (_, rowIndex) => {
            return Array.from({ length: cols }, (_, colIndex) => {
                const defaultCell: BoardCellInformation = {
                    colIndex: colIndex,
                    rowIndex: rowIndex,
                    currentState: CellState.None,
                    originalState: CellState.None
                }
                return defaultCell

            })
        });
    })

    const playableIndeces = Array(cols).fill(rows - 1)

    function isCellPlayable(cellIndexInfo: BoardCellIndexInfo): Boolean {
        const cell = matrix[cellIndexInfo.rowIndex][cellIndexInfo.colIndex]
        return cell.currentState != CellState.CurrentUser && cell.currentState != CellState.OtherUser
    }

    function updatePlayableIndeces() {
        matrix.map((row, rowIndex) => {
            row.map((cell, colIndex) => {
                if (cell.currentState != CellState.CurrentUser && cell.currentState != CellState.OtherUser) {
                    playableIndeces[colIndex] = rowIndex
                }
            })
        })
    }

    updatePlayableIndeces()

    function canHightlightCell(cellIndexInfo: BoardCellIndexInfo): Boolean {
        return matrix[cellIndexInfo.rowIndex][cellIndexInfo.colIndex].currentState == CellState.None
    }

    function updateBoardWhileHovering(cellIndexInfo: BoardCellIndexInfo, state: CellState) {
        setMatrix((prevMatrix) => {
            const newMatrix = prevMatrix.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const isPlayable = isCellPlayable({
                        rowIndex,
                        colIndex
                    })
                    if (colIndex == cellIndexInfo.colIndex && isPlayable) {
                        return {
                            ...cell,
                            currentState: state
                        }
                    }
                    return cell
                })
            )
            return newMatrix
        })
    }

    function updateBoardWithClickedCell(cellIndexInfo: BoardCellIndexInfo) {
        setMatrix((prevMatrix) => {
            const newMatrix = prevMatrix.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    if (colIndex == cellIndexInfo.colIndex && rowIndex == playableIndeces[colIndex]) {
                        return {
                            ...cell,
                            currentState: CellState.CurrentUser
                        }
                    }
                    return cell
                })
            )
            return newMatrix
        })
    }

    function mouseEnteredCell(cellIndexInfo: BoardCellIndexInfo) {
        if (!canHightlightCell(cellIndexInfo)) return;
        updateBoardWhileHovering(cellIndexInfo, CellState.InHightlightedRow)
    }

    function mouseLeaveCell(cellIndexInfo: BoardCellIndexInfo) {
        updateBoardWhileHovering(cellIndexInfo, CellState.None)
    }

    function clickedCell(cellIndexInfo: BoardCellIndexInfo) {
        updateBoardWithClickedCell(cellIndexInfo)
        updatePlayableIndeces()
    }

    return (
        <>
            <div
                style={{
                    backgroundColor: '#819CAE',
                    borderRadius: '10px'
                }}
            >
                {
                    matrix.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map((cell, cellIndex) => {
                                const cellIndexInfo: BoardCellIndexInfo = {
                                    rowIndex: rowIndex,
                                    colIndex: cellIndex
                                }
                                return <BoardCell
                                    rowIndex={rowIndex}
                                    colIndex={cellIndex}
                                    mouseEnterCell={() => mouseEnteredCell(cellIndexInfo)}
                                    mouseLeaveCell={() => mouseLeaveCell(cellIndexInfo)}
                                    clickedCell={() => clickedCell(cellIndexInfo)}
                                    cellState={matrix[rowIndex][cellIndex].currentState}

                                />
                            })}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default FullBoard
