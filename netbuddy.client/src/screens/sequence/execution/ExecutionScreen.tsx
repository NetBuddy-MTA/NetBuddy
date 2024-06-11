import {
  Sequence,
} from "../../../api/sequences/sequences.ts";
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
import mapSequenceVarToInput from "./inputs/inputMappings.ts";

const ExecutionScreen = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [sequence, setSequence] = useState<Sequence>();
  const [values, setValues] = useState<Record<string, any>>({});
  
  const handleExecute =() => {
    // todo implement execution
    console.log("Executing sequence...");
  }
  
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

  const getInputsToFill = (sequence: Sequence) => {
    return sequence.actions.reduce((inputsToFill, action) => {
      action.inputs.forEach(input => inputsToFill.add(input.name));
      action.outputs.forEach(output => inputsToFill.add(output.name));
      return inputsToFill;
    }, new Set<String>());
  };
  
  const onValueChange = (field: string, value: number | string | boolean) => {
    setValues({...values, [field]: value});
    // setValues({...values, [action]: {...values.action, [inputstring]: value}});
  }
  
  useEffect(() => {
      console.log("Values changed", values)
  }, [values])

  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" justifyItems="center" alignItems="center" mb={2}>
        <Button onClick={() => setOpen(true)}>Select sequence🐱‍👤</Button>
        <Typography variant="body1" mr={1}>Selected Sequence: {sequence?.name}</Typography>
      </Box>
      <DownloadSequencePopup open={isOpen} setOpen={setOpen} setSequence={handleSequenceSelect} />
      {sequence && (
        <Paper elevation={4} sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Inputs to Fill:</Typography>
              <Stack spacing={2}>
                {sequence.actions.map(action => (
                  <Card key={action.id}>
                    <CardContent>
                      <Typography variant="h5">{action.actionString}</Typography>
                      {action.inputs.map(input => {
                        const InputComponent = mapSequenceVarToInput[input.type];
                        return <InputComponent 
                          key={action.actionString + "|" +input.originalName} 
                          /*TODO: Change this*/
                          field={action.actionString + "|" +input.originalName} 
                          title={input.originalName} 
                          defaultValue={input.defaultValue} 
                          required={!input.optional} 
                          onChange={onValueChange} />
                      })}
                    </CardContent>
                  </Card>
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

export default ExecutionScreen;