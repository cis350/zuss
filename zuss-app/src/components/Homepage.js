import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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

function Homepage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleRegisterEvent = () => {
    navigate('/register-event');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <StyledButton color="inherit" onClick={handleRegisterEvent}>
            Register Event
          </StyledButton>
          <Title variant="h6">
            Dashboard
          </Title>
          <StyledButton color="inherit" onClick={handleLogout}>
            Logout
          </StyledButton>
        </StyledToolbar>
      </StyledAppBar>
      <ContentBox>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Upcoming Events
        </Typography>
        {/* map over events */}
      </ContentBox>
    </Box>
  );
}

export default Homepage;
