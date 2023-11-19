'use client';
import React, { useState } from 'react';
import Square from './square';

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type Player = 'X' | 'O' | null;

const Board: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const isWinner = checkWinner(newBoard);
    if (isWinner) {
      setWinner(isWinner);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board: Player[]): Player | null => {
    for (let i = 0; i < WINNING_COMBO.length; i++) {
      const [a, b, c] = WINNING_COMBO[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const renderSquare = (index: number) => {
    return (
      <Square
        value={board[index]}
        onClick={() => handleClick(index)}
        disabled={winner !== null}
        key={index}
      />
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">
        {winner ? (
          winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} wins!`
        ) : (
          `Current player: ${currentPlayer}`
        )}
      </h1>
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, index) => renderSquare(index))}
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white font-semibold rounded"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default Board;


