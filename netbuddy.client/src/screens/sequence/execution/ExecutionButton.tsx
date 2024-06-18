import Button from "@mui/material/Button";
import {useMemo} from "react";

type Props = {
  values: Record<string, any>;
  inputs: string[];
  onClick: () => void;
}

export const ExecutionButton = ({values, inputs, onClick}: Props) => {
  const allRequiredFieldsFilled = useMemo(() => {
    return Array.from(inputs).every(input => input in values);
  }, [values, inputs]);

  return (
    <Button id="ExecuteSequenceButton"
            variant="contained" color="primary" size="large" onClick={onClick}
            disabled={!allRequiredFieldsFilled}>
      Execute
    </Button>
  );
}
