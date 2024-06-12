import {useState, ChangeEvent} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const UnknownInput = ({field, defaultValue, onChange, title, required, disabled}: InputProps) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(field, value);
    setValue(value);
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" mr={1}>
        {title}
      </Typography>
      <TextField
        id="string-input"
        type="string"
        value={value}
        onChange={handleOnChange}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        fullWidth
        variant="outlined"
      />
    </Box>
  );
}