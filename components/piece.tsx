import { PieceType, PieceColor } from "../lib/chess-utils.tsx"

interface PieceProps {
  type: PieceType
  color: PieceColor
  small?: boolean
}

export default function Piece({ type, color, small = false }: PieceProps) {
  const colorName = color === PieceColor.White ? "white" : "black"
  const size = small ? 24 : 40

  // For now, we'll use placeholder SVGs for the pieces
  // In a real implementation, you would use the assets/pieces/{color}{type}.png
  return (
    <div className={`relative ${small ? "w-6 h-6" : "w-10 h-10"} flex items-center justify-center`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <PieceIcon type={type} color={color} size={size} />
      </div>
    </div>
  )
}

function PieceIcon({ type, color, size }: { type: PieceType; color: PieceColor; size: number }) {
  const colorClass = color === PieceColor.White ? "text-white" : "text-black"
  const strokeClass = color === PieceColor.White ? "stroke-black" : "stroke-white"
  const fillClass = color === PieceColor.White ? "fill-white" : "fill-black"

  // In a real implementation, you would use:
  // return <Image src={`/assets/pieces/${colorName}${type}.png`} width={size} height={size} alt={`${colorName} ${type}`} />;

  // For now, we'll use SVG representations
  switch (type) {
    case PieceType.Pawn:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <path d="M22.5,9C17.5,9 13.5,13 13.5,18C13.5,21 15.5,23.5 18.5,24.5C18,25.5 16.5,27 16.5,27C16.5,27 15,28 15,30C15,30.5 15.5,31 16,31C16,31 14.5,33.5 14,36C13.5,38.5 22.5,38.5 22.5,38.5C22.5,38.5 31.5,38.5 31,36C30.5,33.5 29,31 29,31C29.5,31 30,30.5 30,30C30,28 28.5,27 28.5,27C28.5,27 27,25.5 26.5,24.5C29.5,23.5 31.5,21 31.5,18C31.5,13 27.5,9 22.5,9Z" />
        </svg>
      )
    case PieceType.Rook:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <path d="M9,39L36,39L36,36L9,36L9,39ZM12,36L12,17L15,17L15,12L12,12L12,9L33,9L33,12L30,12L30,17L33,17L33,36L12,36ZM15,17L30,17L30,12L15,12L15,17Z" />
        </svg>
      )
    case PieceType.Knight:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <path d="M22,10C32.5,10 38.5,18 38,39L15,39C15,30 25,32.5 23,18" />
          <path d="M24,18C24.38,20.91 18.45,25.37 16,27C13,29 13.18,31.34 11,31C9.958,30.06 12.41,27.96 11,28C10,28 11.19,29.23 10,30C9,30 5.997,31 6,26C6,24 12,14 12,14C12,14 13.89,12.1 14,10.5C13.27,9.506 13.5,8.5 13.5,7.5C14.5,6.5 16.5,10 16.5,10L18.5,10C18.5,10 19.28,8.008 21,7C22,7 22,10 22,10" />
        </svg>
      )
    case PieceType.Bishop:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <path d="M9,36C12.39,35.03 19.11,36.43 22.5,34C25.89,36.43 32.61,35.03 36,36C36,36 37.65,36.54 39,38C38.32,38.97 37.35,38.99 36,38.5C32.61,37.53 25.89,38.96 22.5,37.5C19.11,38.96 12.39,37.53 9,38.5C7.646,38.99 6.677,38.97 6,38C7.354,36.06 9,36 9,36Z" />
          <path d="M15,32C17.5,34.5 27.5,34.5 30,32C30.5,30.5 30,30 30,30C30,27.5 27.5,26 27.5,26C33,24.5 33.5,14.5 22.5,10.5C11.5,14.5 12,24.5 17.5,26C17.5,26 15,27.5 15,30C15,30 14.5,30.5 15,32Z" />
          <path d="M25,8A2.5,2.5 0 1,1 20,8A2.5,2.5 0 1,1 25,8Z" />
        </svg>
      )
    case PieceType.Queen:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <path d="M9,26C17.5,24.5 30,24.5 36,26L38,14L31,25L31,11L25.5,24.5L22.5,9L19.5,24.5L14,10.5L14,25L7,14L9,26Z" />
          <path d="M9,26C9,28 10.5,28 11.5,30C12.5,31.5 12.5,31 12,33.5C10.5,34.5 10.5,36 10.5,36C9,37.5 11,38.5 11,38.5C17.5,39.5 27.5,39.5 34,38.5C34,38.5 35.5,37.5 34,36C34,36 34.5,34.5 33,33.5C32.5,31 32.5,31.5 33.5,30C34.5,28 36,28 36,26C27.5,24.5 17.5,24.5 9,26Z" />
          <path d="M11.5,30C15,29 30,29 33.5,30" />
        </svg>
      )
    case PieceType.King:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <path d="M22.5,11.63L22.5,6M20,8L25,8" />
          <path d="M22.5,25C27.5,25 30,17.5 30,17.5C30,17.5 27.5,10 22.5,10C17.5,10 15,17.5 15,17.5C15,17.5 17.5,25 22.5,25Z" />
          <path d="M11.5,37C17,40.5 27,40.5 32.5,37L32.5,30C32.5,30 41.5,25.5 38.5,19.5C34.5,13 25,16 22.5,23.5L22.5,27L22.5,23.5C19,16 9.5,13 6.5,19.5C3.5,25.5 11.5,29.5 11.5,29.5L11.5,37Z" />
        </svg>
      )
    // Custom pieces
    case PieceType.Count:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <circle cx="22.5" cy="22.5" r="15" />
          <path d="M15,15L30,30M15,30L30,15" />
        </svg>
      )
    case PieceType.Jester:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <path d="M10,35C15,38 30,38 35,35C35,35 35,30 35,25C35,20 27,15 22.5,15C18,15 10,20 10,25C10,30 10,35 10,35Z" />
          <path d="M15,10A5,5 0 1,1 25,10A5,5 0 1,1 15,10Z" />
          <path d="M20,15L25,10M20,15L15,10" />
        </svg>
      )
    case PieceType.Sentinel:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <path d="M22.5,5L30,30L15,30Z" />
          <path d="M15,35L30,35" />
        </svg>
      )
    case PieceType.Oracle:
      return (
        <svg width={size} height={size} viewBox="0 0 45 45" className={`${fillClass} ${strokeClass}`}>
          <circle cx="22.5" cy="22.5" r="12" />
          <circle cx="22.5" cy="22.5" r="6" className={color === PieceColor.White ? "fill-black" : "fill-white"} />
          <path d="M22.5,5L22.5,10M22.5,35L22.5,40M5,22.5L10,22.5M35,22.5L40,22.5" />
        </svg>
      )
    default:
      return null
  }
}
