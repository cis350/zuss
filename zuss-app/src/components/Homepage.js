import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, Card, CardContent, CardMedia, Grid, Container, Modal, Chip
} from '@mui/material';
import { styled } from '@mui/system';
import Filter from './Filter'; // Make sure this path is correct
import ZussModalContents from './ZussModal';
import NavBar from './Navbar';

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#456789',
  minHeight: '100vh',
}));

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
    .then(res => res.json())
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
      <NavBar handleRegisterEvent={handleRegisterEvent} handleLogout={handleLogout}/>
      <ContentBox>
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
          Upcoming Events
        </Typography>
        <Container maxWidth="md">
          <Filter setData={setData} allOrganizations={data.map(item => item.organization)} />
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
                    <Typography>{card.description}</Typography>
                    <Chip label={`Location: ${card.location}`} sx={{ mt: 2 }} />
                    <Chip label={`Date: ${card.date}`} sx={{ mt: 2 }} />
                    <Chip label={`Club: ${card.organization}`} sx={{ mt: 2 }} />
                    
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
          <ZussModalContents card={selectedCard} onClose={handleCloseModal}/>
        </Modal>
        )}
      </ContentBox>
    </Box>
  );
}

export default Homepage;