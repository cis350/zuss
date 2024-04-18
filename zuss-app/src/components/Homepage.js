import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box,
} from '@mui/material';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

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

function Homepage() {
  const navigate = useNavigate();
  const [data, setData] = useState([{ id:0, clubName: 'PennApps', eventName: 'Hackathon', image: "https://s3.amazonaws.com/penn.clubs/clubs_small/pennapps.png", description:"biggest collegiate hackathon!"},
  {id:1, clubName: 'WUEC', eventName:'Conference', image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxzxIkJDyIgvJwG6O3yH0CIGajvTuY6Bs3deZ60CPfg&s", description: "entrepreneurship conference and networking event"},
  {id: 2, clubName: 'AOE', eventName:'AOE Formal', image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/HLR-FOAM-PARTY-02.JPG/640px-HLR-FOAM-PARTY-02.JPG", description: "a fun night with aoe"},
  {id: 2, clubName: 'SPEC', eventName:'Spring Fling', image:"https://www.thepinknews.com/wp-content/uploads/2024/04/future-metro-boomin-tour.jpg", description: "ft. Metro and Daya"}
]);
  
  
  console.log('starting');

  // useEffect(() => {
  //   console.log('fetching data');
  //   // `http://${config.server_host}:${config.server_port}/events-data`
  //   fetch('http://localhost:8000/events-data')
  //     .then((res) => {
  //       console.log('first then');
  //       console.log(res);
  //       res.json();
  //     })
  //     .then((resJson) => {
  //       console.log('resJson');
  //       console.log(resJson);
  //       const events = resJson.map((event) => ({ id: event.eventName, ...event.clubName }));
  //       setData(events);
  //       // const events = resJson.map(event => ({ id: event.eventName, ...event }));
  //       // setData(events);
  //     }).catch((error) => {
  //       console.log('Error fetching data:', error);
  //     });
  // }, []);

  const columns = [
    { field: 'eventName', headerName: 'Event', width: 300 },
    { field: 'clubName', headerName: 'Organization', width: 200 },
  ];

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
  />*/}
   <Container sx={{ py: 8}} maxWidth="md">
        <Grid container spacing={4} sx={{mb:5}}>
            {data.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    // image="https://source.unsplash.com/random?wallpapers"
                    image = {card.image}
                    // image = {require('./projectImages/'+card.image)}
                    // style={{height: 50, paddingTop: '56.25%'}}
                    // image={image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.eventName}
                    </Typography>
                    <Typography>
                        <strong>{card.clubName}</strong>
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
          </Grid>
          </Container>
      </ContentBox>
    </Box>
  );
}

export default Homepage;
