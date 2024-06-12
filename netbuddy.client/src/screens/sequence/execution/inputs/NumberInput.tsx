import {useState, ChangeEvent} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const NumberInput = ({field, defaultValue, onChange, title, required}: InputProps) => {
  const [value, setValue] = useState<number | undefined>(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValue(value)
    if (value && !isNaN(value)) {
      onChange(field, value);
      setError(null)
    }
    else {
      setError("Invalid number")
    }
  }
  
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" mr={1}>
        {title}
      </Typography>
      <TextField
        id="number-input"
        type="number"
        value={value}
        onChange={handleOnChange}
        error={!!error}
        helperText={error}
        required={required}
        defaultValue={defaultValue}
        fullWidth
        variant="outlined"
      />
    </Box>
  );
}