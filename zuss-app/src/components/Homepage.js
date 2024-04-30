import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, Card, CardContent, CardMedia, Grid, Container, Modal, Chip
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
        setData(data.data);
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
                    alt={card.eventName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.eventName}
                    </Typography>
                    <Typography>
                      {card.blurb}
                    </Typography>
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
              <Typography  data-testid="modal-modal-blurb" sx={{ mt: 2 }}>
                {selectedCard.blurb}
              </Typography>
              <Typography  data-testid="modal-modal-description" sx={{ mt: 2 }}>
                {selectedCard.descriptionLong}
              </Typography>
              <Chip label={`Location: ${selectedCard.location}`} sx={{ mt: 2 }} />
              <Chip label={`Date: ${selectedCard.date}`} sx={{ mt: 2 }} />
              <Chip label={`Club: ${selectedCard.organization}`} sx={{ mt: 2 }} />
              <Button onClick={handleCloseModal} sx={{ mt: 2, width: '100%' }}>Close</Button>
            </Box>
          </Modal>
        )}
      </ContentBox>
    </Box>
  );
}

export default Homepage;
