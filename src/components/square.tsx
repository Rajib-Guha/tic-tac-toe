import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, disabled }) => {
  return (
    <button
      className="w-16 h-16 border border-gray-500 flex items-center justify-center text-4xl font-bold"
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Square;
