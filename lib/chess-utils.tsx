export enum PieceType {
    Pawn = "pawn",
    Rook = "rook",
    Knight = "knight",
    Bishop = "bishop",
    Queen = "queen",
    King = "king",
    // Special pieces
    Count = "count",
    Jester = "jester",
    Sentinel = "sentinel",
    Oracle = "oracle",
  }
  
  export enum PieceColor {
    White = "white",
    Black = "black",
  }
  
  export interface Position {
    row: number
    col: number
  }
  
  export function initialBoardSetup(): (null | { type: PieceType; color: PieceColor })[][] {
    // Create an 8x8 board filled with null (empty squares)
    const board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null))
  
    // Set up pawns
    for (let col = 0; col < 8; col++) {
      board[1][col] = { type: PieceType.Pawn, color: PieceColor.Black }
      board[6][col] = { type: PieceType.Pawn, color: PieceColor.White }
    }
  
    // Set up rooks
    board[0][0] = { type: PieceType.Rook, color: PieceColor.Black }
    board[0][7] = { type: PieceType.Rook, color: PieceColor.Black }
    board[7][0] = { type: PieceType.Rook, color: PieceColor.White }
    board[7][7] = { type: PieceType.Rook, color: PieceColor.White }
  
    // Set up knights
    board[0][1] = { type: PieceType.Knight, color: PieceColor.Black }
    board[0][6] = { type: PieceType.Knight, color: PieceColor.Black }
    board[7][1] = { type: PieceType.Knight, color: PieceColor.White }
    board[7][6] = { type: PieceType.Knight, color: PieceColor.White }
  
    // Set up bishops
    board[0][2] = { type: PieceType.Bishop, color: PieceColor.Black }
    board[0][5] = { type: PieceType.Bishop, color: PieceColor.Black }
    board[7][2] = { type: PieceType.Bishop, color: PieceColor.White }
    board[7][5] = { type: PieceType.Bishop, color: PieceColor.White }
  
    // Set up queens
    board[0][3] = { type: PieceType.Queen, color: PieceColor.Black }
    board[7][3] = { type: PieceType.Queen, color: PieceColor.White }
  
    // Set up kings
    board[0][4] = { type: PieceType.King, color: PieceColor.Black }
    board[7][4] = { type: PieceType.King, color: PieceColor.White }
  
    return board
  }
  