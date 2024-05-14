import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, Card, CardContent, CardMedia, Grid, Container, Modal, TextField
} from '@mui/material';

import { styled } from '@mui/system';


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

function MultipleSelectChip({onUpdate, allOrganizations}) {
  
  const [organizations, setOrganizations] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    onUpdate(newValue);
    setOrganizations(newValue);
    
  };

  return (
    <div>
      <FormControl sx={{width: 300 }}>
        <InputLabel id="demo-multiple-chip-label" sx={{color:'white'}}>Organization</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={organizations}
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
          {allOrganizations.map((name) => (
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

function Filter({setData, allOrganizations}) {
  console.log("Filter, all organizations = ", allOrganizations);
  const [eventName, setEventName] = useState('');
  const [organizations, setOrganizations] = React.useState([]);
  const handleChange = (newValue) => {
    setOrganizations(newValue);
  };
  const searchOnClick = () => {
    const searchParams = { eventName, organizations };
    fetch('http://localhost:8000/events-data-filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchParams)
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
  };
  return (
    <div style={{margin:"40px"}}>
      <Typography variant="h5" sx={{ color: 'white', mb: 4 }}>
        Search Events
      </Typography>
      <Grid container spacing={3} >
        <Grid item xs={20}>
          <TextField variant="filled" label='Event Name' value={eventName} onChange={(e) => setEventName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={20}>
          <MultipleSelectChip onUpdate={handleChange} allOrganizations={allOrganizations}/>
        </Grid>
        <Grid item xs={20}>
          <Button onClick={searchOnClick} variant="contained">Search</Button>
        </Grid>
      </Grid>
      
        
    </div>
  )
}



function Homepage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [allOrganizations, setAllOrganizations] = useState([]);
  
  
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
        setAllOrganizations([...new Set(data.data.map(item => item.organization))]);
      } else {
        console.error('Data received is not an array:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleRegisterEvent = () => {
    navigate('/register-event');
  };

  function handleCloseModal() {
    setShowModal(false);
  }
  
  function handleOpenModal(card) {
    setShowModal(true);
    setSelectedCard(card);
  }

  
  function ZussModal({card}){
    return (
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
        <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            flexGrow:1
          }}
          width={500}
          alignContent={'center'}>
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: '56.25%',
              }}
              image = {card.image}
            />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {card.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Organization</b>: {card.organization}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Date</b>: {card.date}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Location</b>: {card.location}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Description</b>: {card.descriptionLong}
          </Typography>
          <Box textAlign='center'>
          <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2,  width: '100%' }}>Close</Button>
          </Box>
        </Box>
        </Grid>
      </Grid>
        
        
      </Modal>
    )
  }

  console.log("homepage, all organiaztions = ", allOrganizations);

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
        <Filter setData={setData} allOrganizations={allOrganizations}/>
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

        <ZussModal card={selectedCard}/>


        {/* {showModal && (
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
        )} */}
      </ContentBox>
      
    </Box>
  );
}

export default Homepage;