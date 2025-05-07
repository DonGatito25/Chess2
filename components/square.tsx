import type { ReactNode } from "react"

interface SquareProps {
  isLight: boolean
  isSelected?: boolean
  isValidMove?: boolean
  onClick: () => void
  children?: ReactNode
}

export default function Square({ isLight, isSelected, isValidMove, onClick, children }: SquareProps) {
  let backgroundColor = isLight ? "bg-amber-100" : "bg-amber-800"

  if (isSelected) {
    backgroundColor = "bg-blue-400"
  } else if (isValidMove) {
    backgroundColor = isLight ? "bg-green-200" : "bg-green-600"
  }

  return (
    <div
      className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center ${backgroundColor} relative`}
      onClick={onClick}
    >
      {isValidMove && !children && <div className="absolute w-4 h-4 rounded-full bg-green-500 opacity-60"></div>}
      {children}
    </div>
  )
}
