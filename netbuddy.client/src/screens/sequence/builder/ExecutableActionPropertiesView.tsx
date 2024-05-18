import Paper from "@mui/material/Paper";
import {ExecutableAction, SequenceVariable} from "../../../api/sequences/sequences.ts";
import {useEffect} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

const ExecutableActionPropertiesView = (props: {
  selection: ExecutableAction | undefined, setSelection: (selection: ExecutableAction) => void
}) => {
  const {selection} = props;
  
  useEffect(() => {
  }, [selection]);
  
  const mapVariable = (variable: SequenceVariable) => {
    return (
      <Grid container key={variable.originalName} direction="column">
        <Grid item>
          {variable.originalName}
        </Grid>
      </Grid>
    );
  }
  
  return (
    <Paper elevation={4}>
      <Typography variant="h4" p={1}>
        Properties:
      </Typography>
      <Paper elevation={4}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore/>}>
            <Tooltip title="Inputs are the data that the action needs to run." followCursor={true}>
              <Typography variant="h6">
                Inputs:
              </Typography>
            </Tooltip>
          </AccordionSummary>
          <AccordionDetails>
            {selection ? selection.inputs.map(mapVariable) : null}
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper elevation={4}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore/>}>
            <Tooltip title="Outputs are the data that the action produces." followCursor={true}>
              <Typography variant="h6">
                Outputs:
              </Typography>
            </Tooltip>
          </AccordionSummary>
          <AccordionDetails>
            {selection ? selection.outputs.map(mapVariable) : null}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Paper>
  );
}

export default ExecutableActionPropertiesView;