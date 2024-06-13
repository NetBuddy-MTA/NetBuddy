import {useState, ChangeEvent} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const BooleanInput = ({field, defaultValue, onChange, title, required}: InputProps) => {
  const [value, setValue] = useState<boolean>(defaultValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onChange(field, value);
    setValue(value);
  }

  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={handleOnChange}
            required={required}
            color="primary"
          />
        }
        label={<Typography variant="body1">{title}</Typography>}
      />
    </Box>
  );
}