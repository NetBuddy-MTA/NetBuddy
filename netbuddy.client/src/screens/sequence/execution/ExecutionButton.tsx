import Button from "@mui/material/Button";
import {useMemo} from "react";
import {Sequence} from "../../../api/sequences/sequences.ts";

type Props = {
  sequence: Sequence;
  values: Record<string, any>;
}

export const ExecutionButton = ({sequence, values}: Props) => {
  const handleExecute =() => {
    // todo implement execution
    console.log("Executing sequence...");
  }
  
  const requiredFields = useMemo(() => {
    if (!sequence)
      return new Set<string>();
    const requiredFields = new Set<string>();
    sequence.actions.forEach(action => {
      action.inputs.forEach(input => {
        if (!input.optional) {
          requiredFields.add(action.actionString + "|" + input.originalName);
        }
      });
    });
    return requiredFields;
  }, [sequence]);

  const allRequiredFieldsFilled = useMemo(() => {
    return Array.from(requiredFields).every(field => values[field] !== undefined && values[field] !== "");
  }, [requiredFields, values]);
  
  return (
    <Button variant="contained" color="primary" size="large" onClick={handleExecute} disabled={!allRequiredFieldsFilled}>
      Execute
    </Button>
  );
}
