import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import * as serviceWorker from "./serviceWorker";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {" "}
      {props.value}{" "}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, winner) {
    return (
      <Square
        key={i}
        className={winner ? "js-win" : null}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  tableLoop = () => {
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        const currIndexSquare = i * 3 + j;
        let winner;
        for (let z = 0; z < this.props.winningCombination; z++) {
          if (this.props.winningCombination[z] === currIndexSquare) {
            winner = true;
          }
        }
        console.log(this.props.winningCombination);
        children.push(this.renderSquare(currIndexSquare, winner));
      }
      //Create the parent and add the children
      table.push(
        <div key={i} className="board-row">
          {" "}
          {children}{" "}
        </div>
      );
    }
    return table;
  };

  render() {
    return <div>{this.tableLoop()}</div>;
  }
}
class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.props.onSortChange();
  }
  render() {
    return (
      <div>
        <label htmlFor="sort">Ascend</label>
        <input onChange={this.handleChange} type="checkbox" id="sort" />
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      arrOfPositionClick: [
        {
          squares: ""
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isButtonActive: null,
      isSortAscend: true,
      winningCombination: null
    };
  }
  handleSort() {
    this.setState({
      isSortAscend: !this.state.isSortAscend
    });
  }

  handleClick(i) {
    const arrOfPositionClick = this.state.arrOfPositionClick.slice(
      0,
      this.state.stepNumber + 1
    );
    const currPositionClick =
      Math.floor(i / 3) + 1 + " row, " + ((i % 3) + 1) + " col, ";

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares
        }
      ]),
      arrOfPositionClick: arrOfPositionClick.concat([
        {
          currPositionClick
        }
      ]),

      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      isButtonActive: null
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      isButtonActive: step
    });
  }
  innerChild(move, descOfPosClick, desc) {
    return (
      <li key={move}>
        <div> {descOfPosClick} </div>{" "}
        <button
          className={this.state.isButtonActive === move ? "js-active" : null}
          onClick={() => this.jumpTo(move)}
        >
          {" "}
          {desc}{" "}
        </button>{" "}
      </li>
    );
  }

  render() {
    const history = this.state.history;
    const arrOfPositionClick = this.state.arrOfPositionClick;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    console.log(current.squares);
    let moves = [];

    if (this.state.isSortAscend) {
      for (let move = 0; move < history.length; move++) {
        const desc = move ? "Go to move #" + move : "Go to game start";

        let descOfPosClick =
          move > 0 ? arrOfPositionClick[move].currPositionClick : null;

        moves.push(this.innerChild(move, descOfPosClick, desc));
      }
    } else {
      for (let move = history.length - 1; move > -1; move--) {
        const desc = move !== 0 ? "Go to move #" + move : "Go to game start";

        let descOfPosClick =
          move > 0 ? arrOfPositionClick[move].currPositionClick : null;

        moves.push(this.innerChild(move, descOfPosClick, desc));
      }
    }

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <Sort onSortChange={i => this.handleSort()} />
        <div className="game-board">
          <Board
            winningCombination={this.state.winningCombination}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />{" "}
        </div>{" "}
        <div className="game-info">
          <div> {status} </div> <ol> {moves} </ol>{" "}
        </div>{" "}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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
      console.log(lines[i]);
      return squares[a];
    }
  }
  return null;
}

serviceWorker.unregister();
