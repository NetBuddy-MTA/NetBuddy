import Grid from "@mui/material/Grid";
import ActionsContainer from "./ActionsContainer.tsx";
import getActions, {Action} from "../../../api/actions/actions.ts";
import {useEffect, useState} from "react";
import SequenceOrder from "./SequenceOrder.tsx";
import {
  ExecutableAction,
  SaveExecutableSequence,
  Sequence,
  SequenceVariable
} from "../../../api/sequences/sequences.ts";
import Box from "@mui/material/Box";
import ExecutableActionPropertiesView from "./ExecutableActionPropertiesView.tsx";

const SequenceBuilderScreen = () => {
  const [sequenceId, setSequenceId] = useState<string>("");
  const [sequenceName, setSequenceName] = useState<string>("");
  const [sequenceDescription, setSequenceDescription] = useState<string>("");

  const [actionsToAdd, setActionsToAdd] = useState<Action[]>([]);
  const [executableActions, setExecutableActions] = useState<ExecutableAction[]>([]);
  const [selection, setSelection] = useState<ExecutableAction>();

  const [actionCatalogue, setActionCatalogue] = useState<Action[]>([]);
  const [actionStringToAction, setActionStringToAction] = useState<{ [key: string]: Action; }>({});

  useEffect(() => {
    getActions().then((actions) => {
      setActionCatalogue(actions);
      // Convert the list of actions to a map of actionString to displayName
      setActionStringToAction(
        actions.reduce((acc: { [key: string]: Action }, action) => {
          acc[action.actionString] = action;
          return acc;
        }, {}),
      );
    });
  }, []);

  // todo: testing only, remove once action selection works on middle screen.
  useEffect(() => {
    setSelection(executableActions[executableActions.length - 1]);
  }, [executableActions]);

  // adds an action to the sequence
  const addAction = (action: Action) =>
    setActionsToAdd([...actionsToAdd, action]);

  // finds all the variables of a certain type
  const findVariablesByType = (type: string) =>
    executableActions.reduce((acc: SequenceVariable[], action) => {
      acc.push(...action.inputs, ...action.outputs);
      return acc;
    }, [])
    .filter((variable) => variable.type === type)
    .reduce((acc: Set<string>, variable) => {
      acc.add(variable.name);
      return acc;
    }, new Set<string>());

  // builds the sequence object from the current state
  const buildSequence = () => {
    return {
      id: sequenceId,
      name: sequenceName,
      description: sequenceDescription,
      actions: executableActions,
    } as Sequence;
  };

  // load a sequence from Sequence object
  const loadSequence = (sequence: Sequence) => {
    setSequenceId(sequence.id);
    setSequenceName(sequence.name);
    setSequenceDescription(sequence.description);
    setExecutableActions(sequence.actions);
  };

  // saves the sequence to local storage
  const saveSequenceLocally = () =>
    localStorage.setItem("sequence", JSON.stringify(buildSequence()));

  // uploads the sequence to the server
  const uploadSequence = async () => {
    const sequence = buildSequence();
    const {id, errors} = await SaveExecutableSequence(sequence);
    if (!id && !errors) {
      alert("Failed to reach server!");
    } else if (id !== "") {
      setSequenceId(id);
    } else {
      alert("Failed to upload sequence, errors: " + errors.join(", "));
    }
  };

  return (
    <Box paddingTop={3}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ActionsContainer actions={actionCatalogue} addAction={addAction}/>
        </Grid>
        <Grid item xs={6}>
          <SequenceOrder
            actionStringToAction={actionStringToAction}
            actionsToAdd={actionsToAdd}
            setActionsToAdd={setActionsToAdd}
            executableActions={executableActions}
            setExecutableActions={setExecutableActions}
          />
        </Grid>
        <Grid item xs={3}>
          <ExecutableActionPropertiesView
            selection={selection}
            setSelection={setSelection}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SequenceBuilderScreen;
