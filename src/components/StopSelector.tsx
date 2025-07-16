// src/components/StopSelector.tsx
import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { StopOption } from '../components/types'; // Assuming types are defined

interface StopSelectorProps {
  selectedStopId: string;
  allStops: StopOption[];
  onStopChange: (event: SelectChangeEvent<string>) => void;
}

const StopSelector: React.FC<StopSelectorProps> = ({ selectedStopId, allStops, onStopChange }) => {
  return (
    <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
      <Select
        labelId="stop-select-label"
        id="stop-select"
        value={selectedStopId}
        onChange={onStopChange}
        label="Haltestelle"
        disableUnderline
        sx={{
          color: 'inherit',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          '& .MuiSelect-select': {
            paddingTop: '0',
            paddingBottom: '0',
          },
          '& .MuiSvgIcon-root': {
            color: 'inherit',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: 'background.paper',
              color: 'text.primary',
            },
          },
        }}
      >
        {allStops.map((stop) => (
          <MenuItem key={stop.id} value={stop.id}>
            {stop.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StopSelector;