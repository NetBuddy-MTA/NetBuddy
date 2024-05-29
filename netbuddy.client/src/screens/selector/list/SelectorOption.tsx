import Stack from "@mui/material/Stack";
import {Selector} from "../../../api/selectors/selectors.ts";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

const SelectorOption = ({selector, choice, setChoice}: {
  selector: Selector,
  choice?: Selector,
  setChoice: (selector?: Selector) => void
}) => {
  return (
    <Stack justifyItems="center" alignItems="center" direction="row">
      <Checkbox checked={choice === selector} onClick={() => choice === selector ? setChoice() : setChoice(selector)}/>
      <Typography variant="h6">{selector.name}</Typography>
    </Stack>
  );
};

export default SelectorOption;