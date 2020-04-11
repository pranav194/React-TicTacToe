import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const style =(win)=>{
  const styls = {border : win?"4px solid #ca1414": "2px solid #000"};
  return styls;
}
function Square({value, handleClick, win})
{
  return (
    <Button className ="custombtn"  style = {style(win)} onClick = {handleClick}>{value}</Button>
  )
}
function Board({current,handleClick,win})
{
  
  const renderSquare = (i)=>
  {
     const w = win&&win.includes(i)?true:false
      return (<td><Square  win = {w} value = {current[i]} handleClick ={()=>handleClick(i)}/></td>)
  };
  
  
  return (
    <Container style ={{width : "300px"}}>
    <Table size="sm">
      <tbody>
        <tr xs={3} md={3} lg={3}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </tr>
        <tr xs={3} md={3} lg={3}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </tr>
        <tr xs={3} md={3} lg={3}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </tr>
      </tbody>
    </Table>
    </Container>
  )
}
function Game(){
  const [history, setHistory] = useState([{squares : Array(9).fill(null)}]);
  const [stepnumber, setStepNumber] = useState(0);
  const current  = history[stepnumber];
  const [isXTurn, setTurn] = useState(true);
  const move = history.map((step,move)=>(
      <Button key = {move} style = {{margin : "2px"}}onClick ={()=>jumpTo(move)}>
        {move===0?'Restart the Game':`Go to Step ${move}`}
      </Button>
  ))
  const jumpTo = (i)=>{
    setStepNumber(i);
    setTurn(i%2===0?true:false);
  }
  let status;
  const winner = calculateWinner(current.squares);
  if(winner)
  {
    status = "Winner: " +(isXTurn?'O':'X') ;
  }
  else 
  {
    status = "Next Player: "+(isXTurn?'X':'O');
  }
  const handleClick = (i)=>
  {
    if(current[i]||winner)
    {
      return;
    }
    else
    {
      const newSquare = [...current.squares];
      newSquare[i] = isXTurn?'X':'O';
      const newHistory = history.slice(0,stepnumber+1);
      newHistory.push({squares:newSquare});
      setHistory(newHistory)
      setTurn(!isXTurn);
      setStepNumber(newHistory.length-1);
    }
  }
  
  return (
    <div>
    <Board win ={winner}current = {current.squares} handleClick={handleClick} isXTurn ={isXTurn}/>
    <br/>
    <h3>{status}</h3>
    <br/>
      <ButtonGroup vertical>
        {move}
      </ButtonGroup>
    </div>
  )
}
export default function App() {
  return (
    <React.Fragment>
      <div className= "App">
        <Navbar bg = "dark" variant = "dark" className ="navbar navbar-light bg-light">
          <Navbar.Brand href="#home">Tic Tac Toe</Navbar.Brand>
        </Navbar>
        <Container fluid style ={{textAlign:"center", paddingTop:"15px"}}>
          
          <br/>
          <Game/> 
         < br/>
        </Container>
      </div>
    </React.Fragment>
  )
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
      return lines[i];
    }
  }
  return null;
}

