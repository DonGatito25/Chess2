import ChessBoard from "/components/chess-board"

export default function ChessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">React Chess</h1>
      <ChessBoard />
    </div>
  )
}
