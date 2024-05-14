import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, Card, CardContent, CardMedia, Grid, Container, Modal, Chip
} from '@mui/material';
import { styled } from '@mui/system';
import Filter from './Filter'; // Make sure this path is correct

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#123456',
  color: 'white',
});

export default function ZussModalContents(props){
    return (

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
              image = {props.card.image}
            />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.card.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Organization</b>: {props.card.organization}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Date</b>: {props.card.date}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Location</b>: {props.card.location}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Description</b>: {props.card.descriptionLong}
          </Typography>
          <Box textAlign='center'>
          <Button onClick={props.onClose} variant="contained" sx={{ mt: 2,  width: '100%' }}>Close</Button>
          </Box>
        </Box>
        </Grid>
      </Grid>
        
        

    )
  }
    