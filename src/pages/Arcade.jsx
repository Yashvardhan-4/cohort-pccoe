import React, { useState } from 'react';
import { Gamepad2, RefreshCw, Trophy, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Initial Chess Pieces Layout
const INITIAL_CHESS_BOARD = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

export const Arcade = () => {
  const [selectedGame, setSelectedGame] = useState('chess'); // 'chess' | 'tictactoe' | 'sudoku'
  const [playerColor, setPlayerColor] = useState('White');
  const [board, setBoard] = useState(INITIAL_CHESS_BOARD);
  const [selectedCell, setSelectedCell] = useState(null);
  const [turn, setTurn] = useState('White');

  // Simple Chess Click-to-Move
  const handleCellClick = (r, c) => {
    const piece = board[r][c];

    if (selectedCell) {
      const [fromR, fromC] = selectedCell;
      if (fromR === r && fromC === c) {
        setSelectedCell(null);
        return;
      }

      // Move piece
      const newBoard = board.map((row) => [...row]);
      newBoard[r][c] = newBoard[fromR][fromC];
      newBoard[fromR][fromC] = null;
      setBoard(newBoard);
      setSelectedCell(null);
      setTurn(turn === 'White' ? 'Black (Buddy AI)' : 'White');
    } else if (piece) {
      setSelectedCell([r, c]);
    }
  };

  const resetBoard = () => {
    setBoard(INITIAL_CHESS_BOARD);
    setSelectedCell(null);
    setTurn('White');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none">
      {/* Header (Screenshot 4) */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold font-secondary text-foreground">
            c/arcade
          </h1>
          <img
            src="/assets/dark1-BZ1HA7yb.svg"
            alt="Spider-man doodle"
            className="w-10 h-10 object-contain opacity-70"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Quick browser games you can play inside cohort.
        </p>
      </div>

      {/* Top 3-Card Game Switcher (Screenshot 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Chess Card (Active Blue) */}
        <div
          onClick={() => setSelectedGame('chess')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedGame === 'chess'
              ? 'bg-[#2563EB] text-white border-blue-600 shadow-md shadow-blue-500/20'
              : 'bg-card border-border/80 text-foreground hover:bg-muted/50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4" />
            <h3 className="text-sm font-bold font-secondary">Chess</h3>
          </div>
          <p className={`text-xs mt-1 ${selectedGame === 'chess' ? 'text-blue-100' : 'text-muted-foreground'}`}>
            You vs Buddy AI.
          </p>
        </div>

        {/* Tic-Tac-Toe Card */}
        <div
          onClick={() => setSelectedGame('tictactoe')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedGame === 'tictactoe'
              ? 'bg-[#2563EB] text-white border-blue-600 shadow-md'
              : 'bg-card border-border/80 text-foreground hover:bg-muted/50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            <h3 className="text-sm font-bold font-secondary">Tic-Tac-Toe</h3>
          </div>
          <p className={`text-xs mt-1 ${selectedGame === 'tictactoe' ? 'text-blue-100' : 'text-muted-foreground'}`}>
            Play against Buddy AI.
          </p>
        </div>

        {/* Sudoku Card */}
        <div
          onClick={() => setSelectedGame('sudoku')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedGame === 'sudoku'
              ? 'bg-[#2563EB] text-white border-blue-600 shadow-md'
              : 'bg-card border-border/80 text-foreground hover:bg-muted/50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-sm font-bold font-secondary">Sudoku</h3>
          </div>
          <p className={`text-xs mt-1 ${selectedGame === 'sudoku' ? 'text-blue-100' : 'text-muted-foreground'}`}>
            Fill the 9x9 grid.
          </p>
        </div>
      </div>

      {/* Pill: More games coming soon! */}
      <div className="flex justify-center">
        <span className="px-4 py-1.5 rounded-full bg-card border border-border/80 text-xs font-semibold text-muted-foreground shadow-sm">
          More games coming soon!
        </span>
      </div>

      {/* Playable Chess Arena (Screenshot 4) */}
      {selectedGame === 'chess' && (
        <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Top Status & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">
                You are <strong className="text-foreground">{playerColor}</strong>. Buddy AI is <strong className="text-foreground">Black</strong>.
              </p>
              <p className="text-xs font-bold text-accent mt-0.5">
                {turn === 'White' ? 'Your turn' : "Buddy AI's turn..."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlayerColor('White')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  playerColor === 'White'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Play White
              </button>
              <button
                onClick={() => setPlayerColor('Black')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  playerColor === 'Black'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Play Black
              </button>
              <button
                onClick={resetBoard}
                className="px-3.5 py-1.5 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-xs font-semibold"
              >
                Reset board
              </button>
            </div>
          </div>

          {/* Chessboard Grid (Screenshot 4) */}
          <div className="flex justify-center">
            <div className="w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border-2 border-[#8B5A2B] grid grid-cols-8 grid-rows-8 shadow-2xl">
              {board.map((row, r) =>
                row.map((piece, c) => {
                  const isBlackSquare = (r + c) % 2 === 1;
                  const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`w-full h-full flex items-center justify-center text-2xl sm:text-3xl cursor-pointer select-none transition-colors ${
                        isSelected
                          ? 'bg-yellow-400/80'
                          : isBlackSquare
                          ? 'bg-[#D28C45]'
                          : 'bg-[#FFCE9E]'
                      }`}
                    >
                      {piece && (
                        <span className="filter drop-shadow-md">{piece}</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
