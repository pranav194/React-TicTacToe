import React , {useState} from 'react';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './App.css';


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // console.log(squares)
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] &&squares[b]&&squares[c] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const btnstyles = { marginLeft: "5px",height: "34px"};
function Square({value,onClick})
{
  return (
    <Button className = "square" 
     variant="contained" 
     color="primary" 
     style = {btnstyles} 
     onClick={onClick}>{value}
     </Button>
  )
}
function Board({squares ,handleClick}){
  const renderSquare = (i)=> (<Square value = {squares[i]} onClick = {()=>{handleClick(i)}}></Square>);
  return (
    <div className = "Board">
      <Grid justify="center"
      alignItems="center" container spacing= {3} style ={{padding : "15px"}}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Grid>
      <Grid justify="center"
      alignItems="center" container spacing= {3} style ={{padding : "15px"}} >
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
     </Grid>
     <Grid justify="center"
      alignItems="center" container spacing= {3}  style ={{padding : "15px"}} >
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
    </Grid>
    </div>
  )
}

function Game()
{
  const [history, setHistory]  = useState([{squares:Array(9).fill(null)}]);
  const [XisNext , setX] = useState(false);
  const [stepnumber, setStepNumber] = useState(0);
  const current = history[stepnumber];
  

  const jumpTo = (move)=>{
    setStepNumber(move);
    setX(move%2!==0);
  }

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key = {move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });



  const winner = calculateWinner(current.squares);
  let status = 'Next player: ' + (XisNext ? 'X' : 'O');
  if(winner)
    {
        status = (`Player ${XisNext?'O':'X'} Won`);
    }
  const handleClick = (index)=>{
    const newHistory = history.slice(0, stepnumber + 1);
    const current = newHistory[stepnumber];
    const squares = current.squares.slice();
    if(!squares[index])
    {
      squares[index] = XisNext?'X':'O';
      setHistory(newHistory.concat([{squares:squares}]));
      setX(!XisNext);
      setStepNumber(newHistory.length);
    }
  }
  return (
      <Container>
        <br/>
        <Board XisNext = {XisNext} setX = {setX} squares ={current.squares} handleClick = {handleClick}/> 
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </Container> 
  )  
}

function App() {
 
  // const [player,setTurn] = useState("Player 1")
  
  return (
    <div className="App">
      <AppBar position = "static">
      <Toolbar>
          <Typography variant="h6">
            TicTacToe
          </Typography>
        </Toolbar>
      </AppBar>
      <Game/>
    </div>
  );
}

export default App;
