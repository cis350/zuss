import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />  {/* Login route */}
         
          {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
