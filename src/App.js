import React, { useState } from 'react';
import './style.css';
import Square from './Square';

export default function App(){
  return <Game/>
}

export function Board({xIsNext,squares,onPlay}) {
  

  function handleClick(index){

    if(squares[index] || calculateWinner(squares)){
       return
    }
    const nextSquare =squares.slice();
    if(xIsNext){
      nextSquare[index]='X';
    }
    else{
      nextSquare[index]='O';
    }
    onPlay(nextSquare) // send user current move
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (<>
      <div className="status">{status}</div>
      <div className="board-row">
       <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
       <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
       <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
       <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
       <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
       <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
       <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
  
  </>)
}
  

export default function Game() {
  const [history,setHistory]=useState([Array(9).fill(null)])
  const[currentMove,setCurrentMove]=useState(0)
  const currentSquares = history[currentMove]; // last position ka pata chl jye ga for current move
  let xIsNext = currentMove %2===0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  console.log("history=",history)

function jumpTo(move){
  setCurrentMove(move)
}

  const moves = history.map((square,index) => {
    let description;
    if(index>0){
      description ='Go to move #' + index;
    }else {
      description = 'Go to game start';
    }
    return <li key={index}>
      <button onClick={()=> jumpTo(index)}>{description}</button>
    </li>
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
      <ol>{moves}</ol>
      </div>
    </div>
  );
}