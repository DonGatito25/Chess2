import { useState } from "react"
import Square from "../components/square"
import { initialBoardState, type Color, type Position } from "../lib/chess-types"
import { getValidMoves } from "../lib/chess-rules"

export default function ChessBoard() {
    const [boardState, setBoardState] = useState(initialBoardState)
    const [selectedPiece, setSelectedPiece] = useState<Position | null>(null)
    const [validMoves, setValidMoves] = useState<Position[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<Color>("white")

    // Handle piece selection
    const handleSquareClick = (position: Position) => {
        const { row, col } = position
        const piece = boardState[row][col]

        // If no piece is selected and clicked on a piece of current player's color
        if (!selectedPiece && piece && piece.color === currentPlayer) {
            setSelectedPiece(position)
            setValidMoves(getValidMoves(boardState, position))
            return
        }

        // If a piece is already selected
        if (selectedPiece) {
            // Check if the clicked square is a valid move
            const isValidMove = validMoves.some((move) => move.row === row && move.col === col)

            if (isValidMove) {
                // Move the piece
                const newBoardState = [...boardState.map((row) => [...row])]
                const { row: fromRow, col: fromCol } = selectedPiece
                const movingPiece = newBoardState[fromRow][fromCol]

                // Update the board state
                newBoardState[fromRow][fromCol] = null
                newBoardState[row][col] = movingPiece

                // Switch player
                setBoardState(newBoardState)
                setCurrentPlayer(currentPlayer === "white" ? "black" : "white")
            }

            // Reset selection
            setSelectedPiece(null)
            setValidMoves([])
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 text-lg font-medium">
                Current Player: <span className="capitalize">{currentPlayer}</span>
            </div>
            <div className="grid grid-cols-8 border border-gray-800 shadow-lg">
                {boardState.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                        const position = { row: rowIndex, col: colIndex }
                        const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex
                        const isValidMove = validMoves.some((move) => move.row === rowIndex && move.col === colIndex)

                        return (
                            <Square
                                key={`${rowIndex}-${colIndex}`}
                                position={position}
                                piece={piece}
                                isLight={(rowIndex + colIndex) % 2 === 0}
                                isSelected={isSelected}
                                isValidMove={isValidMove}
                                onClick={() => handleSquareClick(position)}
                            />
                        )
                    }),
                )}
            </div>
        </div>
    )
}
