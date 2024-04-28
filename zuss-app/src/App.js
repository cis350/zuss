import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import RegisterEvent from './components/RegisterEvent';
import './App.css';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/homepage" element={<PrivateRoute><Homepage /></PrivateRoute>} />
  <Route path="/register-event" element={<PrivateRoute><RegisterEvent /></PrivateRoute>} />

        </Routes>
      </div>
    </Router>
  );
}



function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token'); // Adjust based on how you handle auth

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
