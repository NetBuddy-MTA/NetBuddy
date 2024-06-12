import {useState} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export const OptionsInput = ({ field, defaultValue, onChange, title, required, options, disabled }: InputProps) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleOnChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value as string;
    onChange(field, value);
    setValue(value);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" mr={1}>
        {title}
      </Typography>
      <FormControl fullWidth variant="outlined" required={required} disabled={disabled}>
        <Select
          value={value ?? ''}
          onChange={handleOnChange}
        >
          {options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
