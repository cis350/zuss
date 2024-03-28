/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userInfo = { username, password };
      const endpoint = isLogin ? '/login' : '/create-account';
      const url = `http://localhost:4000${endpoint}`;

      try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo),
        });
        if (response.ok) {
            console.log('Success:', await response.text());
          } else {
            console.error('Failed:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
  
      console.log(userInfo);
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Create Account'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'No account? Create one' : 'Already have an account? Login'}
          </Button>
        </form>
      </Container>
    );
};

export default Login;
