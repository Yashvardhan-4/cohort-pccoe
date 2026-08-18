import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  RefreshCw,
  Trophy,
  Crown,
  Sparkles,
  Bot,
  User,
  Zap,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. CHESS CONSTANTS & PIECE LOGIC
// ==========================================
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

const WHITE_PIECES = ['♙', '♖', '♘', '♗', '♕', '♔'];
const BLACK_PIECES = ['♟', '♜', '♞', '♝', '♛', '♚'];

function isWhite(piece) {
  return WHITE_PIECES.includes(piece);
}
function isBlack(piece) {
  return BLACK_PIECES.includes(piece);
}

// Get basic pseudo-legal moves for a chess piece
function getLegalMoves(board, r, c) {
  const piece = board[r][c];
  if (!piece) return [];
  const moves = [];
  const white = isWhite(piece);

  const addIfValid = (nr, nc) => {
    if (nr < 0 || nr > 7 || nc < 0 || nc > 7) return false;
    const target = board[nr][nc];
    if (!target) {
      moves.push([nr, nc]);
      return true; // continue ray
    }
    if (white ? isBlack(target) : isWhite(target)) {
      moves.push([nr, nc]);
    }
    return false; // hit piece, stop ray
  };

  // Pawns
  if (piece === '♙') {
    if (r > 0 && !board[r - 1][c]) {
      moves.push([r - 1, c]);
      if (r === 6 && !board[r - 2][c]) moves.push([r - 2, c]);
    }
    if (r > 0 && c > 0 && isBlack(board[r - 1][c - 1])) moves.push([r - 1, c - 1]);
    if (r > 0 && c < 7 && isBlack(board[r - 1][c + 1])) moves.push([r - 1, c + 1]);
  } else if (piece === '♟') {
    if (r < 7 && !board[r + 1][c]) {
      moves.push([r + 1, c]);
      if (r === 1 && !board[r + 2][c]) moves.push([r + 2, c]);
    }
    if (r < 7 && c > 0 && isWhite(board[r + 1][c - 1])) moves.push([r + 1, c - 1]);
    if (r < 7 && c < 7 && isWhite(board[r + 1][c + 1])) moves.push([r + 1, c + 1]);
  }

  // Knights
  if (piece === '♘' || piece === '♞') {
    const jumps = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1],
    ];
    jumps.forEach(([dr, dc]) => addIfValid(r + dr, c + dc));
  }

  // Kings
  if (piece === '♔' || piece === '♚') {
    const dirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];
    dirs.forEach(([dr, dc]) => addIfValid(r + dr, c + dc));
  }

  // Rooks & Queens (Orthogonal)
  if (['♖', '♜', '♕', '♛'].includes(piece)) {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    dirs.forEach(([dr, dc]) => {
      let step = 1;
      while (addIfValid(r + dr * step, c + dc * step)) step++;
    });
  }

  // Bishops & Queens (Diagonal)
  if (['♗', '♝', '♕', '♛'].includes(piece)) {
    const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    dirs.forEach(([dr, dc]) => {
      let step = 1;
      while (addIfValid(r + dr * step, c + dc * step)) step++;
    });
  }

  return moves;
}

// ==========================================
// 2. TIC-TAC-TOE MINIMAX LOGIC
// ==========================================
const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6],           // Diags
];

function checkTTTWinner(squares) {
  for (let [a, b, c] of WINNING_COMBOS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  if (squares.every((sq) => sq !== null)) return { winner: 'Tie', line: [] };
  return null;
}

function getBestTTTMove(squares) {
  // Check if AI can win immediately
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      const copy = [...squares];
      copy[i] = 'O';
      if (checkTTTWinner(copy)?.winner === 'O') return i;
    }
  }
  // Check if User is winning and block
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      const copy = [...squares];
      copy[i] = 'X';
      if (checkTTTWinner(copy)?.winner === 'X') return i;
    }
  }
  // Take Center
  if (!squares[4]) return 4;
  // Take Corners
  const corners = [0, 2, 6, 8].filter((i) => !squares[i]);
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
  // Take any open square
  const available = squares.map((sq, i) => (sq === null ? i : null)).filter((i) => i !== null);
  return available[0];
}

// ==========================================
// 3. SUDOKU DEFAULT PUZZLES
// ==========================================
const SAMPLE_SUDOKU = {
  initial: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  solution: [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ],
};

export const Arcade = () => {
  const [selectedGame, setSelectedGame] = useState('chess'); // 'chess' | 'tictactoe' | 'sudoku'

  // ----------------------------------------
  // CHESS STATE
  // ----------------------------------------
  const [chessBoard, setChessBoard] = useState(INITIAL_CHESS_BOARD);
  const [selectedChessCell, setSelectedChessCell] = useState(null);
  const [validChessMoves, setValidChessMoves] = useState([]);
  const [chessTurn, setChessTurn] = useState('White'); // 'White' | 'Black'
  const [chessStatus, setChessStatus] = useState('Your turn (White)');
  const [capturedByWhite, setCapturedByWhite] = useState([]);
  const [capturedByBlack, setCapturedByBlack] = useState([]);

  // Handle User Chess Move
  const handleChessCellClick = (r, c) => {
    if (chessTurn !== 'White') return;

    const piece = chessBoard[r][c];

    // If a piece was already selected
    if (selectedChessCell) {
      const [fromR, fromC] = selectedChessCell;
      const isMoveValid = validChessMoves.some(([vr, vc]) => vr === r && vc === c);

      if (isMoveValid) {
        // Execute move
        const newBoard = chessBoard.map((row) => [...row]);
        const movingPiece = newBoard[fromR][fromC];
        const capturedPiece = newBoard[r][c];

        if (capturedPiece) {
          setCapturedByWhite((prev) => [...prev, capturedPiece]);
        }

        newBoard[r][c] = movingPiece;
        newBoard[fromR][fromC] = null;

        setChessBoard(newBoard);
        setSelectedChessCell(null);
        setValidChessMoves([]);
        setChessTurn('Black');
        setChessStatus("Buddy AI is thinking...");
      } else if (piece && isWhite(piece)) {
        // Switch selected piece
        setSelectedChessCell([r, c]);
        setValidChessMoves(getLegalMoves(chessBoard, r, c));
      } else {
        setSelectedChessCell(null);
        setValidChessMoves([]);
      }
    } else if (piece && isWhite(piece)) {
      setSelectedChessCell([r, c]);
      setValidChessMoves(getLegalMoves(chessBoard, r, c));
    }
  };

  // Automated Buddy AI Chess Move
  useEffect(() => {
    if (chessTurn === 'Black' && selectedGame === 'chess') {
      const timer = setTimeout(() => {
        // Gather all black pieces legal moves
        const allBlackMoves = [];
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            const piece = chessBoard[r][c];
            if (piece && isBlack(piece)) {
              const moves = getLegalMoves(chessBoard, r, c);
              moves.forEach(([toR, toC]) => {
                const target = chessBoard[toR][toC];
                const score = target ? 10 : Math.random() * 2;
                allBlackMoves.push({ from: [r, c], to: [toR, toC], score, target });
              });
            }
          }
        }

        if (allBlackMoves.length > 0) {
          // Sort by captures first
          allBlackMoves.sort((a, b) => b.score - a.score);
          const chosen = allBlackMoves[0];

          const newBoard = chessBoard.map((row) => [...row]);
          const movingPiece = newBoard[chosen.from[0]][chosen.from[1]];
          const capturedPiece = newBoard[chosen.to[0]][chosen.to[1]];

          if (capturedPiece) {
            setCapturedByBlack((prev) => [...prev, capturedPiece]);
          }

          newBoard[chosen.to[0]][chosen.to[1]] = movingPiece;
          newBoard[chosen.from[0]][chosen.from[1]] = null;

          setChessBoard(newBoard);
          setChessTurn('White');
          setChessStatus('Your turn (White)');
        } else {
          setChessStatus('Checkmate! You win! 🎉');
        }
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [chessTurn, chessBoard, selectedGame]);

  const resetChess = () => {
    setChessBoard(INITIAL_CHESS_BOARD);
    setSelectedChessCell(null);
    setValidChessMoves([]);
    setChessTurn('White');
    setChessStatus('Your turn (White)');
    setCapturedByWhite([]);
    setCapturedByBlack([]);
  };

  // ----------------------------------------
  // TIC-TAC-TOE STATE
  // ----------------------------------------
  const [tttBoard, setTttBoard] = useState(Array(9).fill(null));
  const [tttScore, setTttScore] = useState({ user: 0, ai: 0, ties: 0 });
  const [tttTurn, setTttTurn] = useState('X'); // 'X' (User) | 'O' (AI)
  const [tttResult, setTttResult] = useState(null); // { winner, line }

  const handleTTTClick = (index) => {
    if (tttBoard[index] || tttResult || tttTurn !== 'X') return;

    const newBoard = [...tttBoard];
    newBoard[index] = 'X';
    setTttBoard(newBoard);

    const winCheck = checkTTTWinner(newBoard);
    if (winCheck) {
      setTttResult(winCheck);
      if (winCheck.winner === 'X') setTttScore((s) => ({ ...s, user: s.user + 1 }));
      else if (winCheck.winner === 'Tie') setTttScore((s) => ({ ...s, ties: s.ties + 1 }));
    } else {
      setTttTurn('O');
    }
  };

  // Buddy AI Tic-Tac-Toe Move
  useEffect(() => {
    if (tttTurn === 'O' && !tttResult && selectedGame === 'tictactoe') {
      const timer = setTimeout(() => {
        const aiMove = getBestTTTMove(tttBoard);
        if (aiMove !== undefined && aiMove !== null) {
          const newBoard = [...tttBoard];
          newBoard[aiMove] = 'O';
          setTttBoard(newBoard);

          const winCheck = checkTTTWinner(newBoard);
          if (winCheck) {
            setTttResult(winCheck);
            if (winCheck.winner === 'O') setTttScore((s) => ({ ...s, ai: s.ai + 1 }));
            else if (winCheck.winner === 'Tie') setTttScore((s) => ({ ...s, ties: s.ties + 1 }));
          } else {
            setTttTurn('X');
          }
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [tttTurn, tttBoard, tttResult, selectedGame]);

  const resetTTT = () => {
    setTttBoard(Array(9).fill(null));
    setTttTurn('X');
    setTttResult(null);
  };

  // ----------------------------------------
  // SUDOKU STATE
  // ----------------------------------------
  const [sudokuGrid, setSudokuGrid] = useState(SAMPLE_SUDOKU.initial.map((r) => [...r]));
  const [selectedSudokuCell, setSelectedSudokuCell] = useState(null);
  const [sudokuErrors, setSudokuErrors] = useState([]);
  const [sudokuCompleted, setSudokuCompleted] = useState(false);

  const handleSudokuInput = (num) => {
    if (!selectedSudokuCell) return;
    const [r, c] = selectedSudokuCell;
    if (SAMPLE_SUDOKU.initial[r][c] !== 0) return; // Clue cannot be modified

    const newGrid = sudokuGrid.map((row) => [...row]);
    newGrid[r][c] = num;
    setSudokuGrid(newGrid);

    // Validate with solution
    if (num !== 0 && num !== SAMPLE_SUDOKU.solution[r][c]) {
      setSudokuErrors((prev) => [...prev.filter(([er, ec]) => er !== r || ec !== c), [r, c]]);
    } else {
      setSudokuErrors((prev) => prev.filter(([er, ec]) => er !== r || ec !== c));
    }

    // Check completion
    const isSolved = newGrid.every((row, ri) =>
      row.every((val, ci) => val === SAMPLE_SUDOKU.solution[ri][ci])
    );
    if (isSolved) setSudokuCompleted(true);
  };

  const handleSudokuHint = () => {
    if (!selectedSudokuCell) return;
    const [r, c] = selectedSudokuCell;
    const correctVal = SAMPLE_SUDOKU.solution[r][c];
    handleSudokuInput(correctVal);
  };

  const resetSudoku = () => {
    setSudokuGrid(SAMPLE_SUDOKU.initial.map((r) => [...r]));
    setSelectedSudokuCell(null);
    setSudokuErrors([]);
    setSudokuCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none">
      {/* Header */}
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
          Playable games inside Cohort against Buddy AI.
        </p>
      </div>

      {/* Top 3-Card Game Switcher (Screenshot 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Chess Card */}
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
              ? 'bg-[#2563EB] text-white border-blue-600 shadow-md shadow-blue-500/20'
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
              ? 'bg-[#2563EB] text-white border-blue-600 shadow-md shadow-blue-500/20'
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

      {/* ========================================================
          1. CHESS ARENA
      ======================================================== */}
      {selectedGame === 'chess' && (
        <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Status & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">
                You are <strong className="text-foreground">White</strong>. Buddy AI is <strong className="text-foreground">Black</strong>.
              </p>
              <p className="text-xs font-bold text-accent mt-0.5">
                {chessStatus}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetChess}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset board</span>
              </button>
            </div>
          </div>

          {/* Captured Pieces Bar */}
          <div className="flex items-center justify-between px-2 text-sm">
            <div className="flex items-center gap-1 text-zinc-400">
              <span className="text-xs font-bold">Buddy captured:</span>
              <span className="tracking-tight">{capturedByBlack.join(' ') || 'None'}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-400">
              <span className="text-xs font-bold">You captured:</span>
              <span className="tracking-tight">{capturedByWhite.join(' ') || 'None'}</span>
            </div>
          </div>

          {/* Interactive Chessboard */}
          <div className="flex justify-center">
            <div className="w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border-4 border-[#8B5A2B] grid grid-cols-8 grid-rows-8 shadow-2xl">
              {chessBoard.map((row, r) =>
                row.map((piece, c) => {
                  const isBlackSquare = (r + c) % 2 === 1;
                  const isSelected = selectedChessCell?.[0] === r && selectedChessCell?.[1] === c;
                  const isLegalMove = validChessMoves.some(([vr, vc]) => vr === r && vc === c);

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleChessCellClick(r, c)}
                      className={`relative w-full h-full flex items-center justify-center text-2xl sm:text-3xl cursor-pointer select-none transition-colors ${
                        isSelected
                          ? 'bg-yellow-400/90'
                          : isBlackSquare
                          ? 'bg-[#D28C45]'
                          : 'bg-[#FFCE9E]'
                      }`}
                    >
                      {/* Legal Move Green Indicator Dot */}
                      {isLegalMove && (
                        <div className="absolute w-3.5 h-3.5 rounded-full bg-emerald-500/80 border-2 border-white shadow-md z-10 animate-pulse" />
                      )}

                      {/* Piece Icon */}
                      {piece && (
                        <span className={`filter drop-shadow-md z-0 ${isWhite(piece) ? 'text-white' : 'text-zinc-950'}`}>
                          {piece}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. TIC-TAC-TOE ARENA
      ======================================================== */}
      {selectedGame === 'tictactoe' && (
        <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Header Status & Scoreboard */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h3 className="text-base font-bold font-secondary text-foreground">
                Tic-Tac-Toe Arena
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {tttResult
                  ? tttResult.winner === 'Tie'
                    ? "Game ended in a tie!"
                    : `Winner: ${tttResult.winner === 'X' ? 'You (X) 🎉' : 'Buddy AI (O) 🤖'}`
                  : tttTurn === 'X'
                  ? 'Your turn (X)'
                  : 'Buddy AI is thinking...'}
              </p>
            </div>

            {/* Scoreboard */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-500 text-xs font-bold">
                You: {tttScore.user}
              </div>
              <div className="px-3 py-1 rounded-xl bg-muted text-muted-foreground text-xs font-bold">
                Ties: {tttScore.ties}
              </div>
              <div className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-500 text-xs font-bold">
                Buddy AI: {tttScore.ai}
              </div>
              <button
                onClick={resetTTT}
                className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                title="Reset Game"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3x3 Tic-Tac-Toe Grid */}
          <div className="flex justify-center py-4">
            <div className="w-72 h-72 grid grid-cols-3 grid-rows-3 gap-3">
              {tttBoard.map((val, idx) => {
                const isWinningSquare = tttResult?.line?.includes(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => handleTTTClick(idx)}
                    className={`rounded-2xl text-4xl font-black flex items-center justify-center transition-all cursor-pointer shadow-md ${
                      isWinningSquare
                        ? 'bg-emerald-500 text-white scale-105 shadow-emerald-500/40'
                        : val === 'X'
                        ? 'bg-blue-600/20 text-blue-500 border-2 border-blue-500/40'
                        : val === 'O'
                        ? 'bg-purple-600/20 text-purple-500 border-2 border-purple-500/40'
                        : 'bg-muted/40 hover:bg-muted/80 text-transparent border border-border'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. SUDOKU ARENA
      ======================================================== */}
      {selectedGame === 'sudoku' && (
        <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h3 className="text-base font-bold font-secondary text-foreground">
                Sudoku Master
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {sudokuCompleted
                  ? 'Congratulations! You solved the Sudoku! 🎉'
                  : 'Fill the 9x9 grid with numbers 1 to 9.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSudokuHint}
                disabled={!selectedSudokuCell}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-500 disabled:opacity-40 text-xs font-bold cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Hint</span>
              </button>
              <button
                onClick={resetSudoku}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* 9x9 Sudoku Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-9 border-4 border-foreground/80 rounded-2xl overflow-hidden shadow-2xl bg-card">
              {sudokuGrid.map((row, r) =>
                row.map((val, c) => {
                  const isInitialClue = SAMPLE_SUDOKU.initial[r][c] !== 0;
                  const isSelected = selectedSudokuCell?.[0] === r && selectedSudokuCell?.[1] === c;
                  const hasError = sudokuErrors.some(([er, ec]) => er === r && ec === c);
                  const isThickRight = c === 2 || c === 5;
                  const isThickBottom = r === 2 || r === 5;

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => setSelectedSudokuCell([r, c])}
                      className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-sm sm:text-base font-bold cursor-pointer transition-colors border border-border/50 ${
                        isThickRight ? 'border-r-2 border-r-foreground/80' : ''
                      } ${isThickBottom ? 'border-b-2 border-b-foreground/80' : ''} ${
                        isSelected
                          ? 'bg-[#2563EB] text-white'
                          : hasError
                          ? 'bg-rose-500/30 text-rose-500 font-black'
                          : isInitialClue
                          ? 'bg-muted/50 text-foreground font-black'
                          : 'hover:bg-muted/30 text-blue-500'
                      }`}
                    >
                      {val !== 0 ? val : ''}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Number Keypad */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleSudokuInput(num)}
                className="w-10 h-10 rounded-xl bg-card border border-border hover:border-accent hover:bg-accent/10 font-bold text-sm text-foreground transition-all cursor-pointer shadow-sm"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handleSudokuInput(0)}
              className="px-4 h-10 rounded-xl bg-muted/60 hover:bg-rose-500/10 hover:text-rose-500 text-xs font-bold text-muted-foreground transition-all cursor-pointer"
            >
              Erase
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
