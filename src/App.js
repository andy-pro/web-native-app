import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Example from './Example'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello-zdrasti</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Example />
      </div>
    );
  }
}

export default App;
