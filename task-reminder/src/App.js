import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pagemain from './pages/Pagemain';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pagemain />} />
      </Routes>
    </Router>
  );
}

export default App;
