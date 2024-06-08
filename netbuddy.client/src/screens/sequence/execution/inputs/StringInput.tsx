import {FC, useState} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const StringInput: FC<InputProps<string>>  = ({field, defaultValue,onChange, title}) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        fullWidth
        variant="outlined"
      />
    </Box>
  );
}