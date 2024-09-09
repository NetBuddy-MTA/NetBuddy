import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";

export type AttributeItemProps = {
  name: string;
  value: string;
  inUse: boolean;
  fullMatch: boolean;
  setValue: (value: string) => void;
  setInUse: (inUse: boolean) => void;
  setFullMatch: (fullMatch: boolean) => void;
};

const AttributeItem = (props: AttributeItemProps) => {
  const {
    name, value, inUse, setValue, setInUse, fullMatch, setFullMatch
  } = props;

  const [used, setUsed] = useState<boolean>(inUse);
  const [doFullMatch, setDoFullMatch] = useState<boolean>(fullMatch);

  return (
    <Stack direction="row" justifyItems="left" alignItems="left" maxWidth={600}>
      <Tooltip title="Use Attribute">
        <Checkbox checked={used} onClick={() => {
          setInUse(!used);
          setUsed(!used);
        }}/>
      </Tooltip>
      <TextField
        fullWidth
        label="Key"
        value={name}
      />
      <TextField
        fullWidth
        label="Value"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Tooltip title="Full Match?">
        <Checkbox checked={doFullMatch} onClick={() => {
          setFullMatch(!doFullMatch);
          setDoFullMatch(!doFullMatch);
        }}/>
      </Tooltip>
    </Stack>
  );
};

export default AttributeItem;