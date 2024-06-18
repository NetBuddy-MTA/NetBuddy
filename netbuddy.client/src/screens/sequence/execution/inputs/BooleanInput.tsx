import {useState, ChangeEvent} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const BooleanInput = ({defaultValue, setValue, title, required}: InputProps) => {
  const [localValue, setLocalValue] = useState<boolean>(defaultValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setValue(val);
    setLocalValue(val);
  }

  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={localValue}
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