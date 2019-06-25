import React from 'react';
import './App.css';
import GuessGameProvider from './components/GuessGame';

function App() {
  return (
    <div className="App">
      <div></div>
      <div><GuessGameProvider/></div>
      <div></div>
    </div>
  );
}

export default App;
