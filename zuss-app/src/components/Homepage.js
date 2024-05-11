import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, Card, CardContent, CardMedia, Grid, Container, Modal, TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { styled } from '@mui/system';
import { blue } from '@mui/material/colors';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


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


const names = [
  'WUEC',
  'Kite and Key',
  'Spark',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectChip() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Organization</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function Filter() {
  const [eventName, setEventName] = useState('');
  const [organization, setOrganizationName] = useState('');
  return (
    <div style={{margin:"40px"}}>
      <Typography variant="h5" sx={{ color: 'white', mb: 4 }}>
        Search Events
      </Typography>
      <Grid container spacing={3} >
        <Grid item xs={20}>
          <TextField label='Event Name' value={eventName} onChange={(e) => setEventName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={20}>
          <MultipleSelectChip/>
        </Grid>
        
      </Grid>
      <Button>Search</Button>
        
    </div>
  )
}

function Homepage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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
        setData(data.data.map((item, index) => ({ ...item, id: index })));
      } else {
        console.error('Data received is not an array:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOpenModal(card) {
    setShowModal(true);
    setSelectedCard(card);
  }

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
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
          Upcoming Events
        </Typography>
        <Container maxWidth="md">
        <Filter/>
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  onClick={() => handleOpenModal(card)}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 140 }}
                    image={card.image}
                    alt={card.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.organization}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {showModal && (
          <Modal
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                width: 400,
              }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedCard.eventName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedCard.descriptionLong}
              </Typography>
              <Button onClick={handleCloseModal} sx={{ mt: 2, width: '100%' }}>Close</Button>
            </Box>
          </Modal>
        )}
      </ContentBox>
    </Box>
  );
}

export default Homepage;