import {useEffect} from "react";
import {Action, Variable} from "../../../api/actions/actions.ts";
import {ExecutableAction, SequenceVariable} from "../../../api/sequences/sequences.ts";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const SequenceOrder = (props: {
  actionStringToAction: { [key: string]: Action },
  actionsToAdd: Action[], setActionsToAdd: (actions: Action[]) => void,
  executableActions: ExecutableAction[], setExecutableActions: (actions: ExecutableAction[]) => void
}) => {
  const {
    actionStringToAction,
    actionsToAdd, setActionsToAdd,
    executableActions, setExecutableActions
  } = props;

  useEffect(() => {
    // get the first action from the list of actions to add
    const action = actionsToAdd.shift();
    // if there is no action, return
    if (!action) return;
    // add the action to the list of executable actions
    setExecutableActions([...executableActions, actionToExecutable(action)]);
    // update the list of actions to add
    setActionsToAdd([...actionsToAdd]);
  }, [actionsToAdd]);

  // convert an action to an executable action
  function actionToExecutable(action: Action): ExecutableAction {
    const actionVariableToSequenceVariable = (actVar: Variable): SequenceVariable => {
      return {
        id: "",
        name: "",
        originalName: actVar.name,
        description: actVar.description,
        type: actVar.type,
        optional: actVar.optional
      };
    }

    return {
      id: "",
      actionString: action.actionString,
      inputs: action.inputs.map(actionVariableToSequenceVariable),
      outputs: action.outputs.map(actionVariableToSequenceVariable)
    }
  }

  const deleteAction = (action: ExecutableAction) =>
    setExecutableActions(executableActions.filter(act => act !== action));

  return (
    <Box m={1} p={1}>
      <Paper elevation={4}>
        <Grid container spacing={2} direction="column">
          {executableActions.map((action, index) => {
            return (
              <Grid item key={index}>
                <Box m={0.5} p={0.5}>
                  <Paper elevation={12}>
                    <Typography variant="h5">
                      {actionStringToAction[action.actionString].displayName}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}

export default SequenceOrder;