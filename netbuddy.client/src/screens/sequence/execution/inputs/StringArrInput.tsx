import {useState, ChangeEvent} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export const StringArrInput = ({ field, defaultValue, onChange, title, required }: InputProps) => {
  const [values, setValues] = useState<string[]>([defaultValue || '']);

  const handleOnChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const updatedValues = [...values];
    updatedValues[index] = newValue;
    setValues(updatedValues);
    onChange(field, updatedValues);
  };

  const handleAddField = () => {
    setValues([...values, '']);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" mr={1}>
        {title}
      </Typography>
      {values.map((value, index) => (
        <TextField
          key={index}
          id={`string-input-${index}`}
          type="text"
          value={value}
          onChange={handleOnChange(index)}
          required={required}
          fullWidth
          variant="outlined"
          sx={{ mb: 1 }}
        />
      ))}
      <Button variant="contained" onClick={handleAddField}>
        <AddIcon />
      </Button>
    </Box>
  );
}