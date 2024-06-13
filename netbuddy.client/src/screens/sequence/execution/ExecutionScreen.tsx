import {ExecutableAction, Sequence, SequenceVariable,} from "../../../api/sequences/sequences.ts";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DownloadSequencePopup from "../builder/DownloadSequencePopup.tsx";
import {Action} from "./Action.tsx";
import {ExecutionButton} from "./ExecutionButton.tsx";
import mapSequenceVarToInput from "./inputs/inputMappings.ts";

const ExecutionScreen = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [sequence, setSequence] = useState<Sequence>();
  const [values, setValues] = useState<Record<string, any>>({});

  const handleSequenceSelect = (sequence: Sequence) => {
    setSequence(sequence);
    setOpen(false);
  }

  // const getInputsToFill = (sequence: Sequence) => {
  //   const inputsToFill = new Set<String>();
  //  
  //   sequence.actions.forEach(action => {
  //     action.inputs.forEach(input => {
  //       if (!inputsToFill.has(input.name)) {
  //         inputsToFill.add(input.name);
  //       }
  //     });
  //
  //     action.outputs.forEach(output => {
  //       if (!inputsToFill.has(output.name)) {
  //         inputsToFill.add(output.name);
  //       }
  //     });
  //   });
  //
  //   return inputsToFill;
  // };

  const actionsToShow = () => {
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
        components.push(action);
      }
      // add all the outputs generated by this action to the seen set because they'll be filled after this action
      action.outputs.map(output => seen.add(output.name));
      return components;
    }, [] as ExecutableAction[]) ?? [];
  };

  const onValueChange = (field: string, value: number | string | boolean) => {
    setValues({...values, [field]: value});
    // setValues({...values, [action]: {...values.action, [inputstring]: value}});
  }

  useEffect(() => {
    console.log("Values changed", values)
  }, [values])

  const actions = actionsToShow();

  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" justifyItems="center" alignItems="center"
           mb={2}>
        <Button onClick={() => setOpen(true)}>Select sequence🐱‍👤</Button>
        <Typography variant="body1" mr={1}>Selected Sequence: {sequence?.name}</Typography>
      </Box>
      <DownloadSequencePopup open={isOpen} setOpen={setOpen} setSequence={handleSequenceSelect}/>
      {sequence && (
        <Paper elevation={4} sx={{mt: 2}}>
          <Card>
            {
              actions.length > 0 &&
                <CardContent>
                    <Typography variant="h6">Inputs to Fill:</Typography>
                    <Stack spacing={2}>
                      {actions.map(action => (
                        <Action key={action.id} actions={sequence.actions} action={action} onChange={onValueChange}/>
                      ))}
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