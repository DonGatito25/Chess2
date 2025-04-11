import Image from "next/image"
import type { PieceType, Color } from "../lib/chess-types"

interface ChessPieceProps {
    type: PieceType
    color: Color
}

export default function ChessPiece({ type, color }: ChessPieceProps) {
    const imagePath = `/assets/pieces/${color}${type.charAt(0).toUpperCase() + type.slice(1)}.png`

    return (
        <div className="select-none w-12 h-12 flex items-center justify-center">
            <Image src={imagePath || "/placeholder.svg"} alt={`${color} ${type}`} width={48} height={48} priority />
        </div>
    )
}
