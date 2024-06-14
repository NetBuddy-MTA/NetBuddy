import {ExecutableAction, SequenceVariable} from "../../../api/sequences/sequences.ts";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import mapSequenceVarToInput from "./inputs/inputMappings.ts";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

type ActionProps = {
  inputsToFill: SequenceVariable[];
  action: ExecutableAction;
  onChange: (field: string, value: number | string | boolean) => void;
}
export const Action = ({inputsToFill, action, onChange}: ActionProps) => {
  return (
    <Card key={action.id}>
      <CardContent>
        <Typography variant="h5" style={{marginBottom: '16px'}}>
          {action.actionString}
        </Typography>
        <Grid container spacing={2}>
          {
            inputsToFill.map(input => {
              const [t]=input.type.split("[]", 1);
              console.log(t, input.type);
              const InputComponent = mapSequenceVarToInput[t];
              return (
                <Grid item xs={12} sm={6} key={action.actionString + "|" + input.originalName}>
                  <InputComponent
                    key={action.actionString + "|" + input.originalName}
                    field={action.actionString + "|" + input.originalName}
                    title={input.originalName}
                    defaultValue={input.defaultValue}
                    required={!input.optional}
                    onChange={onChange}
                    options={[]}
                    disabled={false}
                    isArr={t===input.type}/>
                </Grid>
              );
            })
          }
        </Grid>
      </CardContent>
    </Card>
  );
}