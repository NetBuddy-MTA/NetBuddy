import {useState, ChangeEvent} from 'react';
import {InputProps} from "./types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const handleRemoveField = (index: number) => () => {
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
    onChange(field, updatedValues);
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleRemoveField(index)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ))}
      <Button variant="contained" onClick={handleAddField}>
        <AddIcon />
      </Button>
    </Box>
  );
}