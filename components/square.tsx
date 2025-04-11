import type { Position } from "../lib/chess-types"
import ChessPiece from "../components/chess-piece"

interface SquareProps {
    position: Position
    piece: { type: string; color: string } | null
    isLight: boolean
    isSelected: boolean
    isValidMove: boolean
    onClick: () => void
}

export default function Square({ position, piece, isLight, isSelected, isValidMove, onClick }: SquareProps) {
    const baseClasses = "w-16 h-16 flex items-center justify-center relative"
    const colorClasses = isLight ? "bg-amber-100" : "bg-amber-800"
    const stateClasses = isSelected
        ? "ring-4 ring-blue-500 ring-inset"
        : isValidMove
            ? "ring-4 ring-green-500 ring-opacity-50 ring-inset"
            : ""

    return (
        <div className={`${baseClasses} ${colorClasses} ${stateClasses}`} onClick={onClick}>
            {piece && <ChessPiece type={piece.type} color={piece.color} />}
            {isValidMove && !piece && <div className="w-4 h-4 rounded-full bg-green-500 bg-opacity-50" />}
        </div>
    )
}
