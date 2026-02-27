import { useReducer, useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard.jsx';


function App() {

  return (
    <div className="App">
      <h2>Techtonica Events</h2>
      <Dashboard />

    </div>
  )
}

export default App
