import {ExecutableAction, SequenceVariable} from "../../../api/sequences/sequences.ts";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import mapSequenceVarToInput from "./inputs/inputMappings.ts";
import Card from "@mui/material/Card";
import {useMemo} from "react";

type ActionProps = {
  actions: ExecutableAction[];
  action: ExecutableAction;
  onChange: (field: string, value: number | string | boolean) => void;
}
export const Action = ({actions, action, onChange}: ActionProps) => {
  const beforeActions = useMemo(() => {
    const index= actions.findIndex(a => a.id === action.id);
    return actions.slice(0, index).map(a => a.outputs).flat();
  }, [actions, action]);
  
  const disabledInputs = useMemo(() => {
    return (action.inputs
      .filter(input => beforeActions
        .some(output => output.name === input.name && output.type === input.type)));
  }, [beforeActions, action]);
  
  const isDisabled = (input: SequenceVariable) => disabledInputs.some(disabledInput => disabledInput.name === input.name && disabledInput.type === input.type);
  
  const getOptions = (input: SequenceVariable) => {
    const outputs = beforeActions.filter(output => output.type === input.type);
    return outputs.map(output => output.name);
  }
  
  return (
    <Card key={action.id}>
      <CardContent>
        <Typography variant="h5">{action.actionString}</Typography>
        {action.inputs.map(input => {
          const InputComponent = mapSequenceVarToInput[input.type];
          return <InputComponent
            key={action.actionString + "|" +input.originalName}
            field={action.actionString + "|" +input.originalName}
            title={input.originalName}
            defaultValue={input.name}
            required={!input.optional}
            onChange={onChange} 
            options={getOptions(input)}
            disabled={isDisabled(input)}
          />
        })}
      </CardContent>
    </Card>
  );
}