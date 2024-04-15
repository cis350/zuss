import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, Container, TextField, Select, MenuItem, InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#123456',
  color: 'white',
});

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});

const Title = styled(Typography)({
  flexGrow: 1,
  textAlign: 'center',
});

const StyledButton = styled(Button)({
  margin: '0 12px',
});

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#456789',
  minHeight: '100vh',
}));

function RegisterEvent() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [organization, setOrganization] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleHomepage = () => {
    navigate('/homepage');
  };

  const handleSubmit = async (e) => {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <StyledButton color="inherit" onClick={handleHomepage}>
            Homepage
          </StyledButton>
          <Title variant="h6">
            Register Event
          </Title>
          <StyledButton color="inherit" onClick={handleLogout}>
            Logout
          </StyledButton>
        </StyledToolbar>
      </StyledAppBar>
      <ContentBox>
        {/* form to register event */}

        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Register your event here!
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Event Name"
              name="eventname"
              autoComplete="event name"
              autoFocus
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <InputLabel>Organization</InputLabel>

            <Select
              value={organization}
              label="Organization"
              onChange={(e) => setOrganization(e.target.value)}
            >
              {/* map organizations that the user belongs to */}
              <MenuItem value={10}>WUEC</MenuItem>
              <MenuItem value={20}>Kite and Key</MenuItem>
              <MenuItem value={30}>Spark</MenuItem>
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>

          </form>
        </Container>

      </ContentBox>
    </Box>
  );
}

export default RegisterEvent;
