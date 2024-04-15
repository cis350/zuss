/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import {
  Button, Typography, Grid, Paper, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import zussLogo from '../zussLogo.png';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { username, password };
    console.log(isLogin);
    const endpoint = isLogin ? '/login' : '/sign-up';
    const url = `http://localhost:8000${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      if (response.ok) {
        console.log(url.length);
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Success:', data);
        navigate('/homepage');
      } else {
        const errorMessage = await response.json();
        setErrorMessage(`Failed: ${errorMessage.message}`);
        setOpenDialog(true);
        console.error('Failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Failed: ${errorMessage}`);
      setOpenDialog(true);
    }

    console.log('isLogin:', isLogin, 'Credentials:', userInfo, 'URL:', url);
  };

  return (
    <>
      <Grid container style={{ minHeight: '100vh' }}>

        <Grid
          item
          xs={12}
          sm={6}
          style={{
            backgroundColor: '#11468F', display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
        >
          <img src={zussLogo} alt="Calendar" style={{ maxWidth: '50%', maxHeight: '50%' }} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          style={{
            backgroundColor: '#041562', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          <Box style={{
            margin: 'auto', padding: 20, maxWidth: 400, width: '100%',
          }}
          >
            <Typography component="h1" variant="h5" gutterBottom style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 20 }}>
              Welcome to Zusammen!
            </Typography>
            <Paper elevation={6} style={{ margin: 'auto', padding: 20, maxWidth: 400 }}>
              <Typography component="h2" variant="h5" style={{ textAlign: 'center' }}>
                {isLogin ? 'Login' : 'Create Account'}
              </Typography>
              <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
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
                  style={{ marginTop: 16, marginBottom: 8 }}
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'No account? Create one' : 'Already have an account? Sign in'}
                </Button>
                {errorMessage && <Typography color="error" style={{ marginTop: 8 }}>{errorMessage}</Typography>}
              </form>
              {errorMessage && <Typography color="error" style={{ marginTop: 8 }}>{errorMessage}</Typography>}

            </Paper>
          </Box>
        </Grid>
      </Grid>
      {errorMessage && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="error-dialog-title"
          aria-describedby="error-dialog-description"
        >
          <DialogTitle id="error-dialog-title">Error</DialogTitle>
          <DialogContent>
            <DialogContentText id="error-dialog-description">
              {errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default Login;
