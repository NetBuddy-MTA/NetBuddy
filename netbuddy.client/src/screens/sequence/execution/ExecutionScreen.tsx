import {
  Sequence,
  SequenceVariableType
} from "../../../api/sequences/sequences.ts";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DownloadSequencePopup from "../builder/DownloadSequencePopup.tsx";
import {InputProps, InputType} from "./inputs/types.ts";
import {UrlInput} from "./inputs/UrlInput.tsx";
import {NumberInput} from "./inputs/NumberInput.tsx";
import {StringInput} from "./inputs/StringInput.tsx";
import {BooleanInput} from "./inputs/BooleanInput.tsx";

const MAP_TYPE_TO_INPUT:Record<InputType, (props: InputProps) => React.ReactNode> = {
  string: StringInput,
  number: NumberInput,
  url: UrlInput,
  //boolean: () => <input type="checkbox" />,
  boolean: BooleanInput,
  unknown: () => null,
}

const MAP_SQ_VAR_TO_INPUT:Record<SequenceVariableType, (props: InputProps) => React.ReactNode> = {
  "String": MAP_TYPE_TO_INPUT.string,
  "Number": MAP_TYPE_TO_INPUT.number,
  "URL": MAP_TYPE_TO_INPUT.url,
  "Boolean": MAP_TYPE_TO_INPUT.boolean,
  "?": MAP_TYPE_TO_INPUT.unknown,
  "Element":  MAP_TYPE_TO_INPUT.unknown,
  "Element[]": MAP_TYPE_TO_INPUT.unknown,
  "Selector": MAP_TYPE_TO_INPUT.unknown,
  "Variable": MAP_TYPE_TO_INPUT.unknown,
  "HttpResponse": MAP_TYPE_TO_INPUT.unknown,
  "Tab": MAP_TYPE_TO_INPUT.unknown,
  "Window": MAP_TYPE_TO_INPUT.unknown,
}

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
                        const InputComponent = MAP_SQ_VAR_TO_INPUT[input.type];
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