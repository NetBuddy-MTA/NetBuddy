import {FC, useState} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const UrlInput: FC<InputProps<string>>  = ({field, defaultValue,onChange, title}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        fullWidth
        variant="outlined"
      />
    </Box>
  );
}