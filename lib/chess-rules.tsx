import type { BoardState, Position } from "@/lib/chess-types"

// Check if a position is within the board boundaries
export function isValidPosition(position: Position): boolean {
    const { row, col } = position
    return row >= 0 && row < 8 && col >= 0 && col < 8
}

// Check if a piece can move to a target position
export function canPieceMove(boardState: BoardState, fromPosition: Position, toPosition: Position): boolean {
    const { row: fromRow, col: fromCol } = fromPosition
    const { row: toRow, col: toCol } = toPosition

    // Cannot move to the same position
    if (fromRow === toRow && fromCol === toCol) return false

    const piece = boardState[fromRow][fromCol]
    if (!piece) return false

    const targetPiece = boardState[toRow][toCol]

    // Cannot capture own piece
    if (targetPiece && targetPiece.color === piece.color) return false

    const validMoves = getValidMoves(boardState, fromPosition)
    return validMoves.some((move) => move.row === toRow && move.col === toCol)
}

// Get all valid moves for a piece
export function getValidMoves(boardState: BoardState, position: Position): Position[] {
    const { row, col } = position
    const piece = boardState[row][col]

    if (!piece) return []

    const validMoves: Position[] = []

    switch (piece.type) {
        case "pawn":
            // Simplified pawn movement (no en passant, no double first move)
            const direction = piece.color === "white" ? -1 : 1
            const forwardPos = { row: row + direction, col }

            // Move forward if empty
            if (isValidPosition(forwardPos) && !boardState[forwardPos.row][forwardPos.col]) {
                validMoves.push(forwardPos)
            }

            // Capture diagonally
            const capturePositions = [
                { row: row + direction, col: col - 1 },
                { row: row + direction, col: col + 1 },
            ]

            capturePositions.forEach((pos) => {
                if (isValidPosition(pos)) {
                    const targetPiece = boardState[pos.row][pos.col]
                    if (targetPiece && targetPiece.color !== piece.color) {
                        validMoves.push(pos)
                    }
                }
            })
            break

        case "rook":
            // Rook moves horizontally and vertically
            const rookDirections = [
                { rowDelta: 1, colDelta: 0 }, // down
                { rowDelta: -1, colDelta: 0 }, // up
                { rowDelta: 0, colDelta: 1 }, // right
                { rowDelta: 0, colDelta: -1 }, // left
            ]

            rookDirections.forEach((dir) => {
                let currentPos = { row: row + dir.rowDelta, col: col + dir.colDelta }

                while (isValidPosition(currentPos)) {
                    const targetPiece = boardState[currentPos.row][currentPos.col]

                    if (!targetPiece) {
                        validMoves.push({ ...currentPos })
                    } else {
                        if (targetPiece.color !== piece.color) {
                            validMoves.push({ ...currentPos })
                        }
                        break
                    }

                    currentPos = { row: currentPos.row + dir.rowDelta, col: currentPos.col + dir.colDelta }
                }
            })
            break

        case "knight":
            // Knight moves in L-shape
            const knightMoves = [
                { row: row - 2, col: col - 1 },
                { row: row - 2, col: col + 1 },
                { row: row - 1, col: col - 2 },
                { row: row - 1, col: col + 2 },
                { row: row + 1, col: col - 2 },
                { row: row + 1, col: col + 2 },
                { row: row + 2, col: col - 1 },
                { row: row + 2, col: col + 1 },
            ]

            knightMoves.forEach((pos) => {
                if (isValidPosition(pos)) {
                    const targetPiece = boardState[pos.row][pos.col]
                    if (!targetPiece || targetPiece.color !== piece.color) {
                        validMoves.push(pos)
                    }
                }
            })
            break

        case "bishop":
            // Bishop moves diagonally
            const bishopDirections = [
                { rowDelta: 1, colDelta: 1 }, // down-right
                { rowDelta: 1, colDelta: -1 }, // down-left
                { rowDelta: -1, colDelta: 1 }, // up-right
                { rowDelta: -1, colDelta: -1 }, // up-left
            ]

            bishopDirections.forEach((dir) => {
                let currentPos = { row: row + dir.rowDelta, col: col + dir.colDelta }

                while (isValidPosition(currentPos)) {
                    const targetPiece = boardState[currentPos.row][currentPos.col]

                    if (!targetPiece) {
                        validMoves.push({ ...currentPos })
                    } else {
                        if (targetPiece.color !== piece.color) {
                            validMoves.push({ ...currentPos })
                        }
                        break
                    }

                    currentPos = { row: currentPos.row + dir.rowDelta, col: currentPos.col + dir.colDelta }
                }
            })
            break

        case "queen":
            // Queen moves like rook and bishop combined
            const queenDirections = [
                { rowDelta: 1, colDelta: 0 }, // down
                { rowDelta: -1, colDelta: 0 }, // up
                { rowDelta: 0, colDelta: 1 }, // right
                { rowDelta: 0, colDelta: -1 }, // left
                { rowDelta: 1, colDelta: 1 }, // down-right
                { rowDelta: 1, colDelta: -1 }, // down-left
                { rowDelta: -1, colDelta: 1 }, // up-right
                { rowDelta: -1, colDelta: -1 }, // up-left
            ]

            queenDirections.forEach((dir) => {
                let currentPos = { row: row + dir.rowDelta, col: col + dir.colDelta }

                while (isValidPosition(currentPos)) {
                    const targetPiece = boardState[currentPos.row][currentPos.col]

                    if (!targetPiece) {
                        validMoves.push({ ...currentPos })
                    } else {
                        if (targetPiece.color !== piece.color) {
                            validMoves.push({ ...currentPos })
                        }
                        break
                    }

                    currentPos = { row: currentPos.row + dir.rowDelta, col: currentPos.col + dir.colDelta }
                }
            })
            break

        case "king":
            // King moves one square in any direction
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    if (r === 0 && c === 0) continue

                    const newPos = { row: row + r, col: col + c }
                    if (isValidPosition(newPos)) {
                        const targetPiece = boardState[newPos.row][newPos.col]
                        if (!targetPiece || targetPiece.color !== piece.color) {
                            validMoves.push(newPos)
                        }
                    }
                }
            }
            break

        // Custom piece movement rules
        case "jester":
            // Jester moves like knight but can also move one square diagonally
            // Knight-like moves
            const jesterKnightMoves = [
                { row: row - 2, col: col - 1 },
                { row: row - 2, col: col + 1 },
                { row: row - 1, col: col - 2 },
                { row: row - 1, col: col + 2 },
                { row: row + 1, col: col - 2 },
                { row: row + 1, col: col + 2 },
                { row: row + 2, col: col - 1 },
                { row: row + 2, col: col + 1 },
            ]

            jesterKnightMoves.forEach((pos) => {
                if (isValidPosition(pos)) {
                    const targetPiece = boardState[pos.row][pos.col]
                    if (!targetPiece || targetPiece.color !== piece.color) {
                        validMoves.push(pos)
                    }
                }
            })

            // Diagonal moves (one square)
            const jesterDiagonalMoves = [
                { row: row - 1, col: col - 1 },
                { row: row - 1, col: col + 1 },
                { row: row + 1, col: col - 1 },
                { row: row + 1, col: col + 1 },
            ]

            jesterDiagonalMoves.forEach((pos) => {
                if (isValidPosition(pos)) {
                    const targetPiece = boardState[pos.row][pos.col]
                    if (!targetPiece || targetPiece.color !== piece.color) {
                        validMoves.push(pos)
                    }
                }
            })
            break

        case "count":
            // Count moves like a king but can jump two squares in any direction
            // One square moves (like king)
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    if (r === 0 && c === 0) continue

                    const newPos = { row: row + r, col: col + c }
                    if (isValidPosition(newPos)) {
                        const targetPiece = boardState[newPos.row][newPos.col]
                        if (!targetPiece || targetPiece.color !== piece.color) {
                            validMoves.push(newPos)
                        }
                    }
                }
            }

            // Two square jumps
            for (let r = -2; r <= 2; r += 4) {
                for (let c = -2; c <= 2; c += 4) {
                    const newPos = { row: row + r, col: col + c }
                    if (isValidPosition(newPos)) {
                        const targetPiece = boardState[newPos.row][newPos.col]
                        if (!targetPiece || targetPiece.color !== piece.color) {
                            validMoves.push(newPos)
                        }
                    }
                }
            }
            break

        case "oracle":
            // Oracle moves diagonally like bishop but only up to 2 squares
            const oracleMoves = []
            for (let r = -2; r <= 2; r++) {
                for (let c = -2; c <= 2; c++) {
                    // Only diagonal moves and max 2 squares away
                    if (Math.abs(r) === Math.abs(c) && Math.abs(r) <= 2 && !(r === 0 && c === 0)) {
                        oracleMoves.push({ row: row + r, col: col + c })
                    }
                }
            }

            oracleMoves.forEach((pos) => {
                if (isValidPosition(pos)) {
                    const targetPiece = boardState[pos.row][pos.col]
                    if (!targetPiece || targetPiece.color !== piece.color) {
                        // Check if path is clear for 2-square moves
                        if (Math.abs(pos.row - row) === 2) {
                            const midRow = (row + pos.row) / 2
                            const midCol = (col + pos.col) / 2
                            if (!boardState[midRow][midCol]) {
                                validMoves.push(pos)
                            }
                        } else {
                            validMoves.push(pos)
                        }
                    }
                }
            })
            break

        case "sentinel":
            // Sentinel moves like rook but only up to 3 squares
            for (let i = -3; i <= 3; i++) {
                if (i === 0) continue

                // Horizontal moves
                const horizontalPos = { row, col: col + i }
                if (isValidPosition(horizontalPos)) {
                    let pathClear = true
                    // Check if path is clear
                    const step = i > 0 ? 1 : -1
                    for (let j = step; Math.abs(j) < Math.abs(i); j += step) {
                        if (boardState[row][col + j]) {
                            pathClear = false
                            break
                        }
                    }

                    if (pathClear) {
                        const targetPiece = boardState[horizontalPos.row][horizontalPos.col]
                        if (!targetPiece || targetPiece.color !== piece.color) {
                            validMoves.push(horizontalPos)
                        }
                    }
                }

                // Vertical moves
                const verticalPos = { row: row + i, col }
                if (isValidPosition(verticalPos)) {
                    let pathClear = true
                    // Check if path is clear
                    const step = i > 0 ? 1 : -1
                    for (let j = step; Math.abs(j) < Math.abs(i); j += step) {
                        if (boardState[row + j][col]) {
                            pathClear = false
                            break
                        }
                    }

                    if (pathClear) {
                        const targetPiece = boardState[verticalPos.row][verticalPos.col]
                        if (!targetPiece || targetPiece.color !== piece.color) {
                            validMoves.push(verticalPos)
                        }
                    }
                }
            }
            break

        default:
            // Fallback for any other piece type
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    if (r === 0 && c === 0) continue

                    const newPos = { row: row + r, col: col + c }
                    if (isValidPosition(newPos)) {
                        const targetPiece = boardState[newPos.row][newPos.col]
                        if (!targetPiece || targetPiece.color !== piece.color) {
                            validMoves.push(newPos)
                        }
                    }
                }
            }
    }

    return validMoves
}
