import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import './MysticSquares.css';

// Declare variables
const board = [];
const boardSize = 3;
const mysticSquareCount = boardSize ** 2;
let row = 0;
let column = 1;
let empty = false;


/**
 * Create array of Mystic Squares
 */
Array(mysticSquareCount).fill().map((_, i) => {
  let squareValue = i + 1;
  // First cell of each row increment +1 row no. & reset column count
  if (i % boardSize === 0) {
    row++;
    column = 1;
  };
  // Configure values for empty square
  if (squareValue === mysticSquareCount) {
    squareValue = ' ';
    empty = true;
  };
  column++;
  // Push square to board array
  return board.push({
    'value': squareValue,
    'row': row,
    'column': column - 1,
    'empty': empty,
  });
});


/**
 * locateEmptySquare - returns index position of empty square
 *
 * @returns {number}
 */
const locateEmptySquare = () => {
  return board.findIndex(x => x.empty === true);
}


/**
 * swapSquare - swaps two values in array
 *
 * @param {array} board - array of squares
 * @param {number} a - index position to swap
 * @param {number} b - index position to swap
 */
const swapSquare = (board, a, b) => {
  let tempValue = board[a].value;
  let tempEmpty = board[a].empty;
  board[a].value = board[b].value;
  board[a].empty = board[b].empty;
  board[b].value = tempValue;
  board[b].empty = tempEmpty;
}

/**
 * squareIsMoveable - check if square is moveable
 *
 * @param {object} selected
 * @param {number} selected.index
 * @param {number} selected.row
 * @param {number} selected.column
 * @param {object} empty
 * @param {number} empty.index
 * @param {number} empty.row
 * @param {number} empty.column
 * @returns {boolean}
 */
const squareIsMoveable = (selected, empty) => {
  // Exclude empty cell
  if (selected.index === empty.index) return false;
  // Check if row navigation is legal
  if (((empty.row - selected.row) === -1) || ((empty.row - selected.row) === 1)) {
    if (empty.column === selected.column) {
      console.log('is-moveable');
      return true;
    }
    else {
      // square is immovable
      console.log('is-immovable');
      return false;
    }
  }
  // Check if column navigation is legal
  else if (((empty.column - selected.column) === -1) || ((empty.column - selected.column) === 1)) {
    if (empty.row === selected.row) {
      console.log('is-moveable');
      return true;
    }
    else {
      // square is immovable
      console.log('is-immovable');
      return false;
    }
  }
  else {
    // square is immovable
    console.log('is-immovable');
    return false;
  }
};


/**
 * moveSquare - selects
 *
 * @param {object} square
 * @param {number} square.value
 * @param {number} square.row
 * @param {number} square.column
 * @param {boolean} square.empty
 * @param {number} index
 * @returns {boolean} selectedSquareUpdated
 */
const moveSquare = (square, index) => {
  let emptyIndex = locateEmptySquare();
  let selected = {
    index: index,
    row: square.row,
    column: square.column,
  };
  let empty = {
    index: emptyIndex,
    row: board[emptyIndex].row,
    column: board[emptyIndex].column,
  };

  if (squareIsMoveable(selected, empty)) {
    let selectedSquareUpdated = true;
    swapSquare(board, selected.index, empty.index);
    return selectedSquareUpdated;
  };
};


/**
 * shuffleSquares - shuffles squares on board
 *
 * @param {number} shuffleAttempts
 */
export const shuffleSquares = (shuffleAttempts) => {
  let shuffles = shuffleAttempts || 43;

  Array(shuffles).fill().map((_, i) => {
    // Lookup empty square
    let emptyIndex = locateEmptySquare();
    let empty = {
      index: emptyIndex,
      row: board[emptyIndex].row,
      column: board[emptyIndex].column,
    };
    // Setup properties for proposed square to swap
    let proposedSwapSquare = {
      index: '',
      row: empty.row,
      column: empty.column
    }
    // Array of possible moves

    const moveOptions = [
      function moveUp() {proposedSwapSquare.row++},
      function moveDown() {proposedSwapSquare.row--},
      function moveRight() {proposedSwapSquare.column++},
      function moveLeft() {proposedSwapSquare.column--},
    ];
    // Randomise move
    var randomisedMove = Math.floor(Math.random() * moveOptions.length);
    moveOptions[randomisedMove]();
    // validate if move is legal
    proposedSwapSquare.index = board.findIndex(
      function (element) {
        return element.row === proposedSwapSquare.row && element.column === proposedSwapSquare.column;
      }
    );
    // swap
    if (proposedSwapSquare.index !== -1) {
      console.log('shuffled');
      return moveSquare(proposedSwapSquare, proposedSwapSquare.index);
    }
    else {
      return false;
    }
  });
};


/**
 *
 *
 * @class MysticSquares
 * @extends {React.Component}
 */
class MysticSquares extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: board,
    }
  }
  update() {
    console.log('MysticSquares.update');
    this.setState({
      board: board,
    });
  }
  componentDidMount() {
    this.update();
  }
  render() {
    return (
      this.state.board.map((square, index) =>
        <li
          key={index}
          className="mystic-square">
          <FlatButton
            onTouchTap={() => {
              moveSquare(square, index);
              this.update();
            }}
            label={square.value}
            className="mystic-square-button"
            fullWidth={true} />
        </li>
      )
    );
  }
}

export default MysticSquares;


