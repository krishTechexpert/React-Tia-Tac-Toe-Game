import React, { useState } from 'react';

function Square({ value, onSquareClick, isMatch }) {
  return (
    <button
      className={isMatch ? 'square selected' : 'square'}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
export default Square;
