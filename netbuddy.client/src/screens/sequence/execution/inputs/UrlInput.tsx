import {useState, ChangeEvent} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const UrlInput = ({defaultValue, setValue, title, required}: InputProps) => {
  const [localValue, setLocalValue] = useState<string | undefined>(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (val.match(urlPattern)) {
      setValue(val);
      setError(null)
    }
    else {
      setValue(undefined);
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
        value={localValue}
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