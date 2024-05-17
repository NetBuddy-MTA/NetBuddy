import Grid from "@mui/material/Grid";
import ActionsContainer from "./ActionsContainer.tsx";
import getActions, {Action} from "../../../api/actions/actions.ts";
import {useEffect, useState} from "react";
import SequenceOrder from "./SequenceOrder.tsx";
import {ExecutableAction, Sequence} from "../../../api/sequences/sequences.ts";
import Box from "@mui/material/Box";

const SequenceBuilderScreen = () => {
  const [sequenceId, setSequenceId] = useState<string>("");
  const [sequenceName, setSequenceName] = useState<string>("");
  const [sequenceDescription, setSequenceDescription] = useState<string>("");
  const [actionsToAdd, setActionsToAdd] = useState<Action[]>([]);
  const [executableActions, setExecutableActions] = useState<ExecutableAction[]>([]);
  
  const [actionCatalogue, setActionCatalogue] = useState<Action[]>([]);
  const [actionStringToAction, setActionStringToAction] = useState<{[key: string]: Action}>({});
  useEffect(() => {
    getActions().then(actions => {
      setActionCatalogue(actions);
      // Convert the list of actions to a map of actionString to displayName
      setActionStringToAction(actions.reduce((acc: {[key: string]: Action}, action) => {
        acc[action.actionString] = action;
        return acc;
      }, {}));
    });
  }, []);
  
  const addAction = (action: Action) => setActionsToAdd([...actionsToAdd, action]);
  
  function buildSequence(): Sequence {
    return {
      id: sequenceId,
      name: sequenceName,
      description: sequenceDescription,
      actions: executableActions
    };
  }
  
  return (
    <Box paddingTop={3}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ActionsContainer actions={actionCatalogue} addAction={addAction} />
        </Grid>
        <Grid item xs={6}>
          <SequenceOrder 
            actionStringToAction={actionStringToAction}
            actionsToAdd={actionsToAdd} setActionsToAdd={setActionsToAdd}
            executableActions={executableActions} setExecutableActions={setExecutableActions}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SequenceBuilderScreen;
