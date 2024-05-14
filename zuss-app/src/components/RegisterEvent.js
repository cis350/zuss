import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar, Toolbar, Typography, Button, Box, Container, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { styled } from '@mui/system';
import NavBar from './Navbar';

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
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [organization, setOrganization] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/events-data', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }) 
    .then(res => {
      if (!res.ok) { 
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      if (data && Array.isArray(data.data)) {
        setOrganizations([...new Set(data.data.map(item => item.organization))]);
      } else {
        console.error('Data received is not an array:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const handleHomepage = () => {
    navigate('/homepage');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:8000/post-event', {
        name: eventName,
        date: eventDate,
        location: eventLocation,
        description: eventDescription,
        organizer: organization,
        image: eventImage
      });

      
      navigate('/homepage'); 
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Failed to register event');
      } else {
        setErrorMessage('Failed to connect to the server.');
      }
    }
  };
  
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar handleHomepage={handleHomepage} handleLogout={handleLogout}/>
      {/* <StyledAppBar position="static">
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
      </StyledAppBar> */}
      <ContentBox>
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Register your event here!
          </Typography>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Event Location"
              name="location"
              autoComplete="location"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Event Description"
              name="description"
              autoComplete="description"
              multiline
              rows={4}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Image URL"
              name="image_url"
              value={eventImage}
              onChange={(e) => setEventImage(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Organization</InputLabel>
              <Select
                value={organization}
                label="Organization"
                onChange={(e) => setOrganization(e.target.value)}
              >
                
                <MenuItem value="WUEC">WUEC</MenuItem>
                <MenuItem value="Kite and Key">Kite and Key</MenuItem>
                
                {organizations.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
