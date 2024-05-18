import Paper from "@mui/material/Paper";
import {ExecutableAction, SequenceVariable,} from "../../../api/sequences/sequences.ts";
import React, {useEffect, useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from '@mui/icons-material/Add';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ExecutableActionPropertiesView = (props: {
  selection: ExecutableAction | undefined;
  setSelection: (selection: ExecutableAction) => void;
  findVariablesByType: (type: string) => Set<string>;
}) => {
  const {selection, setSelection, findVariablesByType} = props;
  const [open, setOpen] = useState<string | false>(false);

  useEffect(() => {
  }, [selection]);

  const createCreateVariableOption = (variable: SequenceVariable) => {
    const item = (
      <MenuItem onClick={(e) => {
        e.preventDefault();
        setOpen(variable.originalName);
      }}>
        <AddIcon/>
        <Typography variant="body2">Create New</Typography>
      </MenuItem>
    );
    const dialog = (
      <Dialog
        open={open === variable.originalName}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            variable.name = formJson[variable.originalName];
            setOpen(false);
          }
        }}
      >
        <DialogTitle>Create New Variable</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new variable:
          </DialogContentText>
          <TextField
            autoFocus
            required
            id={variable.originalName}
            name={variable.originalName}
            label="Variable Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button key="cancel" onClick={e => {
            e.preventDefault();
            setOpen(false);
          }}>
            Cancel
          </Button>
          <Button key="submit" type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
    return {item, dialog};
  };
  const createVariableOption = (variable: SequenceVariable, name: string) => {
    return (
      <MenuItem value={name} onClick={e => {
        e.preventDefault();
        variable.name = name;
      }}>
        <Typography variant="body2">{name}</Typography>
      </MenuItem>
    );
  }

  const mapVariable = (variable: SequenceVariable) => {
    const {item, dialog} = createCreateVariableOption(variable);
    const optionsArray = [
      item,
      ...Array.from(findVariablesByType(variable.type)).map(name => createVariableOption(variable, name))
    ];
    return (
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h6">{variable.originalName}</Typography>
          <Typography variant="body1">{variable.description}</Typography>
          <Typography variant="body2">Type: {variable.type}</Typography>
          <Typography variant="body2">Required: {variable.optional ? "Yes" : "No"}</Typography>
          <Select fullWidth>
            {optionsArray}
          </Select>
        </CardContent>
        {dialog}
      </Card>
    );
  };

  const inputComponents = selection ? selection.inputs.map(mapVariable) : null;
  const outputComponents = selection ? selection.outputs.map(mapVariable) : null;
  if (!selection || (!inputComponents && !outputComponents)) return null;

  return (
    <Paper elevation={4}>
      <Typography variant="h4" p={1}>
        Properties:
      </Typography>
      {(inputComponents ?? []).length > 0 ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore/>}>
            <Tooltip
              title="Inputs are the data that the action needs to run."
              followCursor={true}
            >
              <Typography variant="h6">Inputs:</Typography>
            </Tooltip>
          </AccordionSummary>
          <AccordionDetails>{inputComponents}</AccordionDetails>
        </Accordion>
      ) : null}
      {(outputComponents ?? []).length > 0 ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore/>}>
            <Tooltip
              title="Outputs are the data that the action produces."
              followCursor={true}
            >
              <Typography variant="h6">Outputs:</Typography>
            </Tooltip>
          </AccordionSummary>
          <AccordionDetails>{outputComponents}</AccordionDetails>
        </Accordion>
      ) : null}
    </Paper>
  );
};

export default ExecutableActionPropertiesView;
