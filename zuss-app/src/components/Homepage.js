import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate(); 

  const handleLogout = () => { 
    
    navigate('/'); 
  };

  return (
    <div>
      <h1>Success!</h1>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button> 
    </div>
  );
}

export default Homepage;
