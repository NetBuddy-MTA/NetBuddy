import {Sequence, SequenceVariable,} from "../../../api/sequences/sequences.ts";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useState} from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DownloadSequencePopup from "../builder/DownloadSequencePopup.tsx";
import {Action} from "./Action.tsx";
import {ExecutionButton} from "./ExecutionButton.tsx";
import mapSequenceVarToInput from "./inputs/inputMappings.ts";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

const ExecutionScreen = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [sequence, setSequence] = useState<Sequence>();
  const [values, setValues] = useState<Record<string, any>>({});

  const handleSequenceSelect = (sequence: Sequence) => {
    setSequence(sequence);
    setOpen(false);
  }

  const actionElementsToShow = () => {
    const seen = new Set<string>();
    return sequence?.actions.reduce((components, action) => {
      // get list of all inputs that aren't filled by a previous action
      const relevant = (input: SequenceVariable) =>
        !seen.has(input.name) && input.type.split("[]", 1).some(t => t in mapSequenceVarToInput);
      const relevantInputs = action.inputs.filter(relevant);
      // if the list isn't empty
      if (relevantInputs.length > 0) {
        // add the inputs in the list to the seen set because we are handling them
        relevantInputs.map(input => seen.add(input.name));
        // create a component to represent this action
        components.push(<Action key={action.id} inputsToFill={relevantInputs} action={action}
                                onChange={onValueChange}/>)
      }
      // add all the outputs generated by this action to the seen set because they'll be filled after this action
      action.outputs.map(output => seen.add(output.name));
      return components;
    }, [] as JSX.Element[]) ?? [];
  };

  const onValueChange = (field: string, value: number | string | boolean) => {
    setValues({...values, [field]: value});
    // setValues({...values, [action]: {...values.action, [inputstring]: value}});
  }

  const actionElements = actionElementsToShow();

  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" justifyItems="center" alignItems="center"
           mb={2}>
        <Button onClick={() => setOpen(true)}>Select sequence</Button>
        <Typography variant="body1" mr={1}>Selected Sequence: {sequence?.name}</Typography>
      </Box>
      <DownloadSequencePopup open={isOpen} setOpen={setOpen} setSequence={handleSequenceSelect}/>
      {sequence && (
        <Paper elevation={4} sx={{mt: 2}}>
          <Card>
            {
              actionElements.length > 0 &&
                <CardContent>
                    <Typography variant="h6">Inputs to Fill:</Typography>
                    <Stack spacing={2}>
                      {actionElements}
                    </Stack>
                </CardContent>
            }
            <CardActions sx={{justifyContent: 'flex-end'}}>
              <ExecutionButton sequence={sequence} values={values}/>
            </CardActions>
          </Card>
        </Paper>
      )}
    </div>
  );
};

export default ExecutionScreen;