import React from 'react';
import './App.css';
import BarChart from "./BarChart";

function App() {
  return (
    <div className="area">
    <div className = "header">
    <img src="logo.png"/>
    <h1>Process tracker</h1>
    </div>
      <div className="App">
          <BarChart/>
      </div>
    </div>
  );
}

export default App;
