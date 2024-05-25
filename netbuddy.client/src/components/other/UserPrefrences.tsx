import React from "react";
import TextField from "@mui/material/TextField";
import {
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  Stack,
  Switch
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type InputType = "text" | "boolean" | "buttonGroup" | "number" | "select";

export type BasePreferences = {
  label: string;
  type: InputType;
  onChange: (value: any) => void;
  value?: any;
  defaultValue?: any;
};

type ButtonGroupProps = BasePreferences & {
  type: "buttonGroup";
  options: { text: string, icon?: React.ReactNode }[];
  onChange: (value: string) => void;
}

type SelectProps = BasePreferences & {
  type: "select";
  options: { text: string, value: any }[];
}

type MapTypeToInput = {
  buttonGroup: ButtonGroupProps;
  text: BasePreferences;
  boolean: BasePreferences;
  number: BasePreferences;
  select: SelectProps;
}

export type Preferences = BasePreferences | ButtonGroupProps | SelectProps;

type Props = {
  preferences: Preferences[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

type PreferencesComponent = {
  [key in InputType]: (p: MapTypeToInput[key]) => React.ReactNode;
};


const mapTypeToInput: PreferencesComponent = {
  text: ({onChange, label}) => <TextField label={label} variant="outlined" onChange={onChange}/>,
  boolean: ({onChange, label, value}) => {
    return (
      <FormControlLabel
        control={<Switch checked={value} onChange={(e) => onChange(e.target.checked)}/>}
        label={label}>
      </FormControlLabel>
    );
  },
  buttonGroup: ({options, value, onChange}: ButtonGroupProps) => {
    return (
      <ButtonGroup>
        {options.map((option) =>
          (<Button key={option.text}
                   startIcon={option.icon}
                   variant={value === option.text ? "contained" : "outlined"}
                   onClick={() => onChange(option.text)}>
            {option.text}
          </Button>))}
      </ButtonGroup>
    );
  },
  number: ({onChange, label}) => <TextField label={label} type="number" variant="outlined" onChange={onChange}/>,
  select: ({options, onChange, value, label}) => {
    return (
      <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            label={label}
            onChange={onChange}>
            {options.map((option) => <MenuItem key={option.text} value={option.value}>{option.text}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    );
  }
};

const UserPreferences = ({preferences, isOpen, setIsOpen}: Props) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth={true}>
      <DialogTitle sx={{textAlign: 'center'}}>
        User Preferences
      </DialogTitle>
      <DialogContent>
        <Stack direction="column" justifyContent="center" justifyItems="center" alignItems="center" spacing={2}>
          {preferences.map((p, index) => {
            const Input = mapTypeToInput[p.type];
            return <Input key={index} {...(p as any)}/>;
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default UserPreferences;