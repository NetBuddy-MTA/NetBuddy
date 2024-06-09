import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";

export type AttributeItemProps = {
  name: string;
  value: string;
  inUse: boolean;
  setValue: (value: string) => void;
  setInUse: (inUse: boolean) => void;
};

const AttributeItem = (props: AttributeItemProps) => {
  const {
    name, value, inUse, setValue, setInUse
  } = props;

  const [used, setUsed] = useState<boolean>(inUse);

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
    </Stack>
  );
};

export default AttributeItem;