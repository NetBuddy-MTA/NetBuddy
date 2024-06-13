import {useState, ChangeEvent} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const UrlInput = ({field, defaultValue, onChange, title, required}: InputProps) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value)
    
    if(!value) {
      setError(null)
      return
    }
    try {
     const url = new URL(value);
      onChange(field, value);
      setError(null)
    } catch (e) {
      setError("Invalid URL")
    }
  }
  
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" mr={1}>
        {title}
      </Typography>
      <TextField
        id="url-input"
        type="url"
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