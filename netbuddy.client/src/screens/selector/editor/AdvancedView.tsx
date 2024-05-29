import {useEffect, useState} from "react";
import {Selector, selectorToString} from "../../../api/selectors/selectors.ts";
import TextField from "@mui/material/TextField";

const AdvancedView = ({choice}: { choice?: Selector }) => {
  const [selectorString, setSelectorString] = useState<string>("");

  useEffect(() => {
    choice && setSelectorString(selectorToString(choice));
  }, [choice]);

  return (
    <TextField
      sx={{input: {textAlign: "center"}}}
      fullWidth
      multiline={false}
      variant="outlined"
      label="Selector"
      value={selectorString}
      color="primary"
      disabled
    />
  );
};

export default AdvancedView;