import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import MultipleSelectChip from './MultipleSelectChip';  // Ensure this component is correctly handling multiple selections

function Filter({ setData, allOrganizations }) {
    const [eventName, setEventName] = useState('');
    const [organizations, setOrganizations] = useState([]);

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
        <div style={{ margin: "40px" }}>
            <Typography variant="h5" sx={{ color: 'white', mb: 4 }}>
                Search Events
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        variant="filled"
                        label="Event Name"
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* Assuming MultipleSelectChip is a component you have created that works similarly to the MUI Chip with multiple select */}
                    <MultipleSelectChip onUpdate={handleChange} allOrganizations={allOrganizations} />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={searchOnClick} variant="contained">Search</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Filter;
