import React from 'react';
import MysticSquares, {shuffleSquares} from './MysticSquares';
import './MysticBoard.css';

/**
 *
 *
 * @class MysticBoard
 * @extends {React.Component}
 */
class MysticBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: MysticSquares,
    };
  }

  componentDidMount() {
    shuffleSquares();
  }

  render() {
    return (
      <ul className="mystic-board"><MysticSquares /></ul>
    );
  }
}

export default MysticBoard;
