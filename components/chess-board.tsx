import { useState, useEffect } from "react"
import Square from "./square.tsx"
import Piece from "./piece.tsx"
import { initialBoardSetup, PieceType, PieceColor, type Position } from "../lib/chess-utils.tsx"

export default function ChessBoard() {
  const [board, setBoard] = useState(initialBoardSetup())
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null)
  const [validMoves, setValidMoves] = useState<Position[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>(PieceColor.White)
  const [capturedPieces, setCapturedPieces] = useState<{
    [PieceColor.White]: PieceType[]
    [PieceColor.Black]: PieceType[]
  }>({
    [PieceColor.White]: [],
    [PieceColor.Black]: [],
  })

  // Calculate valid moves when a piece is selected
  useEffect(() => {
    if (selectedPiece) {
      const piece = board[selectedPiece.row][selectedPiece.col]
      if (piece && piece.color === currentPlayer) {
        setValidMoves(getValidMoves(selectedPiece, board))
      } else {
        setValidMoves([])
      }
    } else {
      setValidMoves([])
    }
  }, [selectedPiece, board, currentPlayer])

  const getValidMoves = (position: Position, currentBoard: (null | { type: PieceType; color: PieceColor })[][]) => {
    const piece = currentBoard[position.row][position.col]
    if (!piece) return []

    const moves: Position[] = []
    const { type, color } = piece

    // Implement chess piece movement rules
    switch (type) {
      case PieceType.Pawn:
        // Pawns move forward 1 square (or 2 from starting position)
        const direction = color === PieceColor.White ? -1 : 1
        const startRow = color === PieceColor.White ? 6 : 1

        // Move forward one square
        if (
          position.row + direction >= 0 &&
          position.row + direction < 8 &&
          !currentBoard[position.row + direction][position.col]
        ) {
          moves.push({ row: position.row + direction, col: position.col })

          // Move forward two squares from starting position
          if (position.row === startRow && !currentBoard[position.row + 2 * direction][position.col]) {
            moves.push({ row: position.row + 2 * direction, col: position.col })
          }
        }

        // Capture diagonally
        for (const offset of [-1, 1]) {
          if (
            position.row + direction >= 0 &&
            position.row + direction < 8 &&
            position.col + offset >= 0 &&
            position.col + offset < 8
          ) {
            const targetPiece = currentBoard[position.row + direction][position.col + offset]
            if (targetPiece && targetPiece.color !== color) {
              moves.push({ row: position.row + direction, col: position.col + offset })
            }
          }
        }
        break

      case PieceType.Rook:
        // Rooks move horizontally and vertically
        for (const direction of [
          { row: -1, col: 0 }, // up
          { row: 1, col: 0 }, // down
          { row: 0, col: -1 }, // left
          { row: 0, col: 1 }, // right
        ]) {
          let newRow = position.row + direction.row
          let newCol = position.col + direction.col

          while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = currentBoard[newRow][newCol]
            if (!targetPiece) {
              moves.push({ row: newRow, col: newCol })
            } else {
              if (targetPiece.color !== color) {
                moves.push({ row: newRow, col: newCol })
              }
              break
            }
            newRow += direction.row
            newCol += direction.col
          }
        }
        break

      case PieceType.Knight:
        // Knights move in L-shape
        for (const move of [
          { row: -2, col: -1 },
          { row: -2, col: 1 },
          { row: -1, col: -2 },
          { row: -1, col: 2 },
          { row: 1, col: -2 },
          { row: 1, col: 2 },
          { row: 2, col: -1 },
          { row: 2, col: 1 },
        ]) {
          const newRow = position.row + move.row
          const newCol = position.col + move.col

          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = currentBoard[newRow][newCol]
            if (!targetPiece || targetPiece.color !== color) {
              moves.push({ row: newRow, col: newCol })
            }
          }
        }
        break

      case PieceType.Bishop:
        // Bishops move diagonally
        for (const direction of [
          { row: -1, col: -1 }, // up-left
          { row: -1, col: 1 }, // up-right
          { row: 1, col: -1 }, // down-left
          { row: 1, col: 1 }, // down-right
        ]) {
          let newRow = position.row + direction.row
          let newCol = position.col + direction.col

          while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = currentBoard[newRow][newCol]
            if (!targetPiece) {
              moves.push({ row: newRow, col: newCol })
            } else {
              if (targetPiece.color !== color) {
                moves.push({ row: newRow, col: newCol })
              }
              break
            }
            newRow += direction.row
            newCol += direction.col
          }
        }
        break

      case PieceType.Queen:
        // Queens move like rooks and bishops combined
        for (const direction of [
          { row: -1, col: 0 }, // up
          { row: 1, col: 0 }, // down
          { row: 0, col: -1 }, // left
          { row: 0, col: 1 }, // right
          { row: -1, col: -1 }, // up-left
          { row: -1, col: 1 }, // up-right
          { row: 1, col: -1 }, // down-left
          { row: 1, col: 1 }, // down-right
        ]) {
          let newRow = position.row + direction.row
          let newCol = position.col + direction.col

          while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = currentBoard[newRow][newCol]
            if (!targetPiece) {
              moves.push({ row: newRow, col: newCol })
            } else {
              if (targetPiece.color !== color) {
                moves.push({ row: newRow, col: newCol })
              }
              break
            }
            newRow += direction.row
            newCol += direction.col
          }
        }
        break

      case PieceType.King:
        // Kings move one square in any direction
        for (const direction of [
          { row: -1, col: -1 }, // up-left
          { row: -1, col: 0 }, // up
          { row: -1, col: 1 }, // up-right
          { row: 0, col: -1 }, // left
          { row: 0, col: 1 }, // right
          { row: 1, col: -1 }, // down-left
          { row: 1, col: 0 }, // down
          { row: 1, col: 1 }, // down-right
        ]) {
          const newRow = position.row + direction.row
          const newCol = position.col + direction.col

          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = currentBoard[newRow][newCol]
            if (!targetPiece || targetPiece.color !== color) {
              moves.push({ row: newRow, col: newCol })
            }
          }
        }
        break

      // Special pieces with undefined move sets for now
      case PieceType.Count:
      case PieceType.Jester:
      case PieceType.Sentinel:
      case PieceType.Oracle:
        // For now, these pieces can move one square in any direction like a king
        for (const direction of [
          { row: -1, col: -1 }, // up-left
          { row: -1, col: 0 }, // up
          { row: -1, col: 1 }, // up-right
          { row: 0, col: -1 }, // left
          { row: 0, col: 1 }, // right
          { row: 1, col: -1 }, // down-left
          { row: 1, col: 0 }, // down
          { row: 1, col: 1 }, // down-right
        ]) {
          const newRow = position.row + direction.row
          const newCol = position.col + direction.col

          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = currentBoard[newRow][newCol]
            if (!targetPiece || targetPiece.color !== color) {
              moves.push({ row: newRow, col: newCol })
            }
          }
        }
        break
    }

    return moves
  }

  const handleSquareClick = (row: number, col: number) => {
    // If no piece is selected, select the piece if it belongs to the current player
    if (!selectedPiece) {
      const piece = board[row][col]
      if (piece && piece.color === currentPlayer) {
        setSelectedPiece({ row, col })
      }
      return
    }

    // If a piece is already selected
    const isValidMove = validMoves.some((move) => move.row === row && move.col === col)

    if (isValidMove) {
      // Move the piece
      const newBoard = [...board.map((row) => [...row])]
      const piece = newBoard[selectedPiece.row][selectedPiece.col]

      // Check if there's a piece to capture
      if (newBoard[row][col]) {
        const capturedPiece = newBoard[row][col]
        if (capturedPiece) {
          setCapturedPieces((prev) => ({
            ...prev,
            [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece.type],
          }))
        }
      }

      // Move the piece
      newBoard[row][col] = piece
      newBoard[selectedPiece.row][selectedPiece.col] = null

      // Update the board
      setBoard(newBoard)

      // Switch players
      setCurrentPlayer(currentPlayer === PieceColor.White ? PieceColor.Black : PieceColor.White)

      // Reset selection
      setSelectedPiece(null)
    } else {
      // If clicking on another piece of the same color, select that piece instead
      const piece = board[row][col]
      if (piece && piece.color === currentPlayer) {
        setSelectedPiece({ row, col })
      } else {
        // If clicking on an invalid square, deselect
        setSelectedPiece(null)
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <div className="text-lg font-semibold">
          Current Player: {currentPlayer === PieceColor.White ? "White" : "Black"}
        </div>
      </div>

      <div className="grid grid-cols-8 border-2 border-gray-800 shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex
            const isValidMove = validMoves.some((move) => move.row === rowIndex && move.col === colIndex)

            return (
              <Square
                key={`${rowIndex}-${colIndex}`}
                isLight={(rowIndex + colIndex) % 2 === 0}
                isSelected={isSelected}
                isValidMove={isValidMove}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && <Piece type={piece.type} color={piece.color} />}
              </Square>
            )
          }),
        )}
      </div>

      <div className="mt-6 flex justify-between w-full max-w-md">
        <div>
          <h3 className="font-semibold mb-2">Captured White Pieces:</h3>
          <div className="flex flex-wrap gap-2">
            {capturedPieces[PieceColor.White].map((type, index) => (
              <div key={index} className="w-8 h-8">
                <Piece type={type} color={PieceColor.White} small />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Captured Black Pieces:</h3>
          <div className="flex flex-wrap gap-2">
            {capturedPieces[PieceColor.Black].map((type, index) => (
              <div key={index} className="w-8 h-8">
                <Piece type={type} color={PieceColor.Black} small />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
