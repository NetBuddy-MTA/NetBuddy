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

export const StringInput = ({defaultValue, setValue, title, required, isArr }: InputProps) => {
  const [localValue, setLocalValue] = useState<string | undefined>(defaultValue);
  const [localValues, setLocalValues] = useState<string[]>(defaultValue ? [defaultValue as string] : ['']);

  const handleSingleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setLocalValue(newValue);
  };

  const handleArrayChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const updatedValues = [...localValues];
    updatedValues[index] = newValue;
    setLocalValues(updatedValues);
    setValue(updatedValues);
  };

  const handleAddField = () => {
    setLocalValues([...localValues, '']);
  };

  const handleRemoveField = (index: number) => () => {
    const updatedValues = localValues.filter((_, i) => i !== index);
    setLocalValues(updatedValues);
    setValue(updatedValues);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" mr={1}>
        {title}
      </Typography>
      {!isArr ? (
        <TextField
          id="string-input"
          type="string"
          value={localValue}
          onChange={handleSingleChange}
          required={required}
          fullWidth
          variant="outlined"
        />
      ) : (
        <>
          {localValues.map((value, index) => (
            <TextField
              key={index}
              id={`string-input-${index}`}
              type="text"
              value={value}
              onChange={handleArrayChange(index)}
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
        </>
      )}
    </Box>
  );
};