import Dialog from "@mui/material/Dialog";
import {
  GetExecutableSequence,
  GetSequencesDisplay,
  Sequence,
  SequenceDisplay, SequenceVariable
} from "../../../api/sequences/sequences.ts";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { FC, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';

const Try: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [displaySequences, setDisplaySequences] = useState<SequenceDisplay[]>([]);
  const [sequence, setSequence] = useState<Sequence | null>(null);
  //const [inputs, setInputs] = useState<any[]>([]);

  let inputsToFill: SequenceVariable[] = [];
  let mySet: Set<string> = new Set<string>();

  useEffect(() => {
    if (!isOpen) return;
    GetSequencesDisplay().then(setDisplaySequences);
  }, [isOpen]);

  const createHandler = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    GetExecutableSequence(id).then(sequence => {
      sequence.actions.forEach((action, index) => action.id = index.toString());
      setSequence(sequence);
      collectInputs();
      //const extractedInputs = sequence.actions.map(action => action.inputs);
      //setInputs(extractedInputs);
    });
    setOpen(false);
  };

  function collectInputs() {
    const typesUserCanFill = ["String", "number", "url"];
    sequence?.actions?.forEach((action) => {
      action.inputs?.forEach(input => {
        if (!mySet.has(input.originalName) && typesUserCanFill.includes(input.type)) {
          inputsToFill.push(input);
          mySet.add(input.originalName);
        }
      });
      action.outputs?.forEach(output => {
        mySet.add(output.originalName);
      });
    });
  }

  function handleExecute() {
    // todo implement execution
    console.log("Executing sequence...");
  }

  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" justifyItems="center" alignItems="center" mb={2}>
        <Button onClick={() => setOpen(true)}>Select sequence🐱‍👤</Button>
        <Typography variant="body1" mr={1}>Selected Sequence: {sequence?.name}</Typography>
        <Typography variant="body1" mr={1}>{sequence?.description}</Typography>
      </Box>
      <Dialog open={isOpen} onClose={() => setOpen(false)}>
        <DialogTitle>Choose Sequence to Load:</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={1}>
            {displaySequences.map(info => {
              return (
                <Card key={info.id}>
                  <CardContent>
                    <Typography variant="h5">{info.name}</Typography>
                    <Typography variant="body2">{info.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton type="submit" onClick={createHandler(info.id)}>
                      <CheckCircleOutlineRoundedIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button key="cancel" onClick={e => {
            e.preventDefault();
            setOpen(false);
          }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {sequence && inputsToFill.length > 0 && (
        <Paper elevation={4} sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Inputs to Fill:</Typography>
              <Stack spacing={2}>
                {inputsToFill.map(input => (
                  <TextField
                    required={!input.optional}
                    key={input.originalName}
                    name={input.originalName}
                    label={input.originalName}
                    defaultValue={input.defaultValue}
                    fullWidth
                  />
                ))}
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" size="large" onClick={handleExecute}>
                Execute
              </Button>
            </CardActions>
          </Card>
        </Paper>
      )}
    </div>
  );
};

// function getNeededInputs(sequence: Sequence) {
//   //return sequence.actions.map(action => action.inputs);
//   const allInputs = sequence?.actions?.flatMap(action => action.inputs || []);
//   console.log(allInputs);
//   const allOutputs = sequence?.actions?.flatMap(action => action.outputs || []);
//   const neededInputs = allInputs?.filter(input => !allOutputs?.some(output => output.originalName === input.originalName));
//   return neededInputs;
// }


export default Try;