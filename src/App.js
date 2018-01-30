import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MysticBoard from './MysticBoard';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">15 Puzzle</h2>
        </div>
        <MysticBoard />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
