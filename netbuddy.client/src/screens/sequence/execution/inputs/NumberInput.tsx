import {FC, useState} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const NumberInput: FC<InputProps<number>>  = ({field, defaultValue,onChange, title}) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        fullWidth
        variant="outlined"
      />
    </Box>
  );
}