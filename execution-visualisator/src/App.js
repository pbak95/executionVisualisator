import React from 'react';
import './App.css';
import BarChart from "./BarChart";

function App() {
  return (
    <div className="App">
        <BarChart/>
        <div className="graph1">
            <svg className="graph2" width="1700px" height="1700px"/>
      </div>
    </div>
  );
}

export default App;
