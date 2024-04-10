import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage'; 
import RegisterEvent from './components/RegisterEvent'; 
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/homepage" element={<Homepage />} /> 
          <Route path="/register-event" element={<RegisterEvent />} /> 
    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
