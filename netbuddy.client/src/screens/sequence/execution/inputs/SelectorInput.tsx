import {useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectorScreen from "../../../selector/SelectorScreen.tsx";
import {InputProps} from "./types.ts";
import {Selector} from "../../../../api/selectors/selectors.ts";
import Box from "@mui/material/Box";

export const SelectorInput = ({title, defaultValue}: InputProps) => {
  const [value, setValue] = useState<Selector | undefined>(defaultValue);
  const [isOpen, setOpen] = useState<boolean>(false);
  
  const handleSetSelection = (selector?: Selector) => {
    setValue(selector);
    setOpen(false);
  };
  
  return (
    <Box>
      <Typography variant="body1">{title}</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Select a selector
      </Button>
      {value && (
        <Typography variant="body1" mr={1}>Selected selector: {value?.name}</Typography>)}
      <SelectorScreen open={isOpen} onClose={() => setOpen(false)} setSelection={handleSetSelection} />
    </Box>
  );
};