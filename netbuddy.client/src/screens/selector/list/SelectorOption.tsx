import Stack from "@mui/material/Stack";
import {Selector} from "../../../api/selectors/selectors.ts";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const SelectorOption = ({selector, choice, setChoice}: {
  selector: Selector,
  choice?: Selector,
  setChoice: (selector?: Selector) => void
}) => {
  return (
    <Stack justifyItems="center" alignItems="center" direction="row">
      <Tooltip sx={{maxWidth: 'none', maxHeight: 'none'}} arrow
               title={<Box component="img" src={selector.base64Image}/>}>
        <Checkbox checked={choice === selector}
                  onClick={() => choice === selector ? setChoice() : setChoice(selector)}/>
      </Tooltip>
      <Typography variant="h6">{selector.name}</Typography>
    </Stack>
  );
};

export default SelectorOption;