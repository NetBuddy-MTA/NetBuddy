import Dialog from "@mui/material/Dialog";
import {
  GetExecutableSequence,
  GetSequencesDisplay,
  Sequence,
  SequenceDisplay
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';

const ExecutionScreen: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [displaySequences, setDisplaySequences] = useState<SequenceDisplay[]>([]);
  const [sequence, setSequence] = useState<Sequence | null>(null);
  //const [inputs, setInputs] = useState<any[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    GetSequencesDisplay().then(setDisplaySequences);
  }, [isOpen]);

  const createHandler = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    GetExecutableSequence(id).then(sequence => {
      sequence.actions.forEach((action, index) => action.id = index.toString());
      setSequence(sequence);
      //const extractedInputs = sequence.actions.map(action => action.inputs);
      //setInputs(extractedInputs);
    });
    setOpen(false);
  };

  function handleExecute() {
    // todo implement execution
    console.log("Executing sequence...");
  }

  return (
    <div>
      <Box display="flex" justifyContent="center" justifyItems="center" alignItems="center" mb={2}>
        <Typography variant="body1" mr={1}>Selected Sequence: {sequence?.name}</Typography>
        <Button onClick={() => setOpen(true)}>Click me I'm pretty🐱‍👤</Button>
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
      {sequence && (
        <Paper elevation={4} sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Actions:</Typography>
              {sequence.actions?.map(action => (
                <Accordion key={action.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${action.id}-content`}
                    id={`panel${action.id}-header`}
                  >
                    <Typography>{action.actionString}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {action.inputs?.length ? <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-inputs-${action.id}-content`}
                        id={`panel-inputs-${action.id}-header`}
                      >
                        <Typography>Inputs</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={2}>
                          {action.inputs.map((input) => (
                            <TextField required={!input.optional}
                              key={input.originalName}
                              label={input.originalName}
                              defaultValue={input.defaultValue}
                              fullWidth
                            />
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion> : null}
                  </AccordionDetails> 
                </Accordion>
              ))}
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

export default ExecutionScreen;