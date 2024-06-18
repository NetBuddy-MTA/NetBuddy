import {useState} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export const OptionsInput = ({defaultValue, setValue, title, required, options}: InputProps) => {
  const [localValue, setLocalValue] = useState<string | undefined>(defaultValue);

  const handleOnChange = (e: SelectChangeEvent<string>) => {
    const val = e.target.value as string;
    setValue(val);
    setLocalValue(val);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" mr={1}>
        {title}
      </Typography>
      <FormControl fullWidth variant="outlined" required={required}>
        <Select
          value={localValue ?? ''}
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
