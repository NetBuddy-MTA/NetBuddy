import Button from "@mui/material/Button";
import {useMemo} from "react";
import {Sequence, SequenceVariable} from "../../../api/sequences/sequences.ts";
import mapSequenceVarToInput from "./inputs/inputMappings.ts";

type Props = {
  sequence: Sequence;
  values: Record<string, any>;
}

export const ExecutionButton = ({sequence, values}: Props) => {
  const handleExecute =() => {
    // todo implement execution
  }
  
  const requiredFields = useMemo(() => {
    if (!sequence) return new Set<string>();
    const seen = new Set<string>();
    const requiredFields = new Set<string>();

    sequence.actions.forEach(action => {
      const relevant = (input: SequenceVariable) =>
        !seen.has(input.name) && input.type.split("[]", 1).some(t => t in mapSequenceVarToInput);
      const relevantInputs = action.inputs.filter(relevant);

      relevantInputs.forEach(input => {
        if (!input.optional) {
          requiredFields.add(action.actionString + "|" + input.originalName);
          seen.add(input.name);
        }
      });
      action.outputs.forEach(output => seen.add(output.name));
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
