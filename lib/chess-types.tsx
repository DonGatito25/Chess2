export type PieceType =
    | "pawn"
    | "rook"
    | "knight"
    | "bishop"
    | "queen"
    | "king"
    | "jester"
    | "count"
    | "oracle"
    | "sentinel"
export type Color = "white" | "black"

export interface ChessPiece {
    type: PieceType
    color: Color
}

export interface Position {
    row: number
    col: number
}

export type BoardState = (ChessPiece | null)[][]

// Initial board setup with custom pieces
export const initialBoardState: BoardState = [
    [
        { type: "rook", color: "black" },
        { type: "knight", color: "black" },
        { type: "bishop", color: "black" },
        { type: "queen", color: "black" },
        { type: "king", color: "black" },
        { type: "bishop", color: "black" },
        { type: "knight", color: "black" },
        { type: "rook", color: "black" },
    ],
    [
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
        { type: "jester", color: "black" },
        { type: "count", color: "black" },
        { type: "oracle", color: "black" },
        { type: "sentinel", color: "black" },
        { type: "pawn", color: "black" },
    ],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    [
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
        { type: "jester", color: "white" },
        { type: "count", color: "white" },
        { type: "oracle", color: "white" },
        { type: "sentinel", color: "white" },
        { type: "pawn", color: "white" },
    ],
    [
        { type: "rook", color: "white" },
        { type: "knight", color: "white" },
        { type: "bishop", color: "white" },
        { type: "queen", color: "white" },
        { type: "king", color: "white" },
        { type: "bishop", color: "white" },
        { type: "knight", color: "white" },
        { type: "rook", color: "white" },
    ],
]
