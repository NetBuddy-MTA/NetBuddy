import Stack from "@mui/material/Stack";
import {SelectorStage} from "../../../api/selectors/selectors.ts";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {useState} from "react";

export type StageItemProps = {
  stage: SelectorStage;
  setInUse: (inUse: boolean) => void;
  select: () => void;
};

const StageItem = (props: StageItemProps) => {
  const {
    stage, setInUse, select
  } = props;

  const [used, setUsed] = useState<boolean>(stage.inUse);

  return (
    <Stack direction="row" justifyItems="center" alignItems="center" spacing={1}>
      <Checkbox checked={used} onClick={() => {
        setInUse(!used);
        setUsed(!used);
      }}/>
      <Button variant="outlined" onClick={select}>{stage.tag}</Button>
    </Stack>
  );
};

export default StageItem;