import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
const config = require('../config.json');

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

function Homepage () {
  const navigate = useNavigate();
  const [data, setData] = useState([{clubName:'WUEC', eventName:'Hackathon'}]);
  console.log("starting");

  useEffect(() => {
    console.log("fetching data");
    //`http://${config.server_host}:${config.server_port}/events-data`
    fetch(`http://localhost:3000/events-data`)
      .then(res => {
        console.log("first then");
        console.log(res);
        res.json();})
      .then(resJson => {
        console.log("resJson");
        console.log(resJson);
        const events = resJson.map((event) => ({ id: event.eventName, ...event.clubName }));
        setData(events);
        // const events = resJson.map(event => ({ id: event.eventName, ...event }));
        // setData(events);
      }).catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const columns = [
    { field: 'eventName', headerName: 'Event', width: 300, },
    { field: 'clubName', headerName: 'Organization', width: 200,}
  ]

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
        {/* <DataGrid
          rows={data}
          columns={columns}
          rowsPerPageOptions={[5, 10, 25]}
          autoHeight
        /> */}
      </ContentBox>
    </Box>
  );
};

export default Homepage;
