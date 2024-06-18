import Button from "@mui/material/Button";
import {useMemo} from "react";
import {Sequence} from "../../../api/sequences/sequences.ts";

type Props = {
  sequence: Sequence;
  values: Record<string, any>;
  inputs: string[];
}

export const ExecutionButton = ({sequence, values, inputs}: Props) => {
  const handleExecute = () => {
    // todo implement execution
  }

  const allRequiredFieldsFilled = useMemo(() => {
    return Array.from(inputs).every(input => input in values);
  }, [values, inputs]);

  return (
    <Button variant="contained" color="primary" size="large" onClick={handleExecute}
            disabled={!allRequiredFieldsFilled}>
      Execute
    </Button>
  );
}
