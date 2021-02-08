import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component {
  render() {
    return (
      <div
        className="square"
        style={squareStyle}
        onClick={() => this.props.altera(this.props.bloco.l, this.props.bloco.c)}
        >
        {this.props.bloco.value}
      </div>
    );
  }
}

function Board() {
  // toda vez que alguem jogar tem que veirifcar se ganhou
  // não pode deixar marcar um bloco que já está marcado
  // um jogador por vez
  const [winner, setWinner] = useState('None');
  const [jogador, setJogador] = useState('X');
  const [blocos, setBlocos] = useState([
      [
        {value: '', clicked: false, l: 0, c: 0},
        {value: '', clicked: false, l: 0, c: 1},
        {value: '', clicked: false, l: 0, c: 2}
      ],
      [
        {value: '', clicked: false, l: 1, c: 0},
        {value: '', clicked: false, l: 1, c: 1},
        {value: '', clicked: false, l: 1, c: 2}
      ],
      [
        {value: '', clicked: false, l: 2, c: 0},
        {value: '', clicked: false, l: 2, c: 1},
        {value: '', clicked: false, l: 2, c: 2}
      ]
    ]);

  function altera(l, c) {
    if (!blocos[l][c].clicked) {
      let newBlocos = blocos;
      newBlocos[l][c].value = jogador;
      newBlocos[l][c].clicked = true;
      setBlocos(newBlocos);
      if (!temGanhador()) {
        setJogador(jogador == 'X' ? 'O' : 'X');
      }

    }
  }

  function reset() {
    setBlocos([
      [
        {value: '', clicked: false, l: 0, c: 0},
        {value: '', clicked: false, l: 0, c: 1},
        {value: '', clicked: false, l: 0, c: 2}
      ],
      [
        {value: '', clicked: false, l: 1, c: 0},
        {value: '', clicked: false, l: 1, c: 1},
        {value: '', clicked: false, l: 1, c: 2}
      ],
      [
        {value: '', clicked: false, l: 2, c: 0},
        {value: '', clicked: false, l: 2, c: 1},
        {value: '', clicked: false, l: 2, c: 2}
      ]
    ]);
    setWinner('None');
    setJogador('X');
  }

  function temGanhador() {
    if (blocos[0][0].value != '' && blocos[0][0].value == blocos[0][1].value && blocos[0][1].value == blocos[0][2].value) {
      setWinner(jogador)
      return true;
    }
    else if (blocos[1][0].value != '' && blocos[1][0].value == blocos[1][1].value && blocos[1][1].value == blocos[1][2].value) {
      setWinner(jogador)
      return true;
    }
    else if (blocos[2][0].value != '' && blocos[2][0].value == blocos[2][1].value && blocos[2][1].value == blocos[2][2].value) {
      setWinner(jogador)
      return true;
    }
    else if (blocos[0][0].value != '' && blocos[0][0].value == blocos[1][0].value && blocos[1][0].value == blocos[2][0].value) {
      setWinner(jogador)
      return true;
    }
    else if (blocos[0][1].value != '' && blocos[0][1].value == blocos[1][1].value && blocos[1][1].value == blocos[2][1].value) {
      setWinner(jogador)
      return true;
    }
    else if (blocos[0][2].value != '' && blocos[0][2].value == blocos[1][2].value && blocos[1][2].value == blocos[2][2].value) {
      setWinner(jogador)
      return true;
    }
    else if (blocos[0][0].value != '' && blocos[0][0].value == blocos[1][1].value && blocos[1][1].value == blocos[2][2].value) {
      setWinner(jogador)
      return true;
    }
    else if (blocos[2][0].value != '' && blocos[2][0].value == blocos[1][1].value && blocos[1][1].value == blocos[0][2].value) {
      setWinner(jogador)
      return true;
    }
    return false;
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>Next player: {jogador}</div>
      <div className="winner" style={instructionsStyle}>Winner: {winner}</div>
      <button style={buttonStyle} onClick={reset}>Reset</button>
      <div style={boardStyle}>
        {blocos.map(linha => (
          <div key={Math.random(1)} className="board-row" style={rowStyle}>
            <Square bloco={linha[0]} altera={altera} />
            <Square bloco={linha[1]} altera={altera} />
            <Square bloco={linha[2]} altera={altera} />
          </div>
        ))}
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);