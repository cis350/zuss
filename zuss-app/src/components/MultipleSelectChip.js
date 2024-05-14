import React from 'react';
import { Select, MenuItem, OutlinedInput, Chip, Box, FormControl, InputLabel } from '@mui/material';

function MultipleSelectChip({ onUpdate, allOrganizations }) {
    const [selectedOrganizations, setSelectedOrganizations] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedOrganizations(
            typeof value === 'string' ? value.split(',') : value,
        );
        onUpdate(value);
    };

    const uniqueOrganizations = [...new Set(allOrganizations)]; // Removing duplicates here

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Organization</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                multiple
                value={selectedOrganizations}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
            >
                {uniqueOrganizations.map((organization) => (
                    <MenuItem key={organization} value={organization}>
                        {organization}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultipleSelectChip;
