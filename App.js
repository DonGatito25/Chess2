import ChessBoard from "./components/chess-board.tsx"

export default function ChessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">React Chess</h1>
      <ChessBoard />
    </div>
  )
}
