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
import SequenceBuilderButtons from "./SequenceBuilderButtons.tsx";
import DownloadSequencePopup from "./DownloadSequencePopup.tsx";
import SequenceDetailsPopup from "./SequenceDetailsPopup.tsx";

const SequenceBuilderScreen = () => {
  const [sequence, setSequence] = useState<Sequence>({
    id: "",
    name: "",
    description: "",
    actions: []
  });

  const [actionsToAdd, setActionsToAdd] = useState<Action[]>([]);
  const [selection, setSelection] = useState<ExecutableAction>();
  const setCurrentSelection = (newAction: ExecutableAction | undefined) => {
    newAction && setSequence({
      ...sequence,
      actions: sequence.actions.map(action => action.id === newAction.id ? newAction : action)
    });
    setSelection(newAction);
  };

  const [actionCatalogue, setActionCatalogue] = useState<Action[]>([]);
  const [actionStringToAction, setActionStringToAction] = useState<{ [key: string]: Action; }>({});

  const [openDownloadPopup, setOpenDownloadPopup] = useState<boolean>(false);
  const [openDetailsPopup, setOpenDetailsPopup] = useState<boolean>(false);

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

  // adds an action to the sequence
  const addAction = (action: Action) =>
    setActionsToAdd([...actionsToAdd, action]);

  // finds all the variables of a certain type
  const findVariablesByType = (type: string) =>
    sequence.actions.reduce((acc: SequenceVariable[], action) => {
      acc.push(...action.inputs, ...action.outputs);
      return acc;
    }, [])
    .filter((variable) => variable.type === type)
    .reduce((acc: Set<string>, variable) => {
      acc.add(variable.name);
      return acc;
    }, new Set<string>());

  // load a sequence from Sequence object
  const loadSequence = (sequence?: Sequence) => {
    if (!sequence) {
      // get json of sequence from local storage if exists
      const local = localStorage.getItem("sequence");
      if (!local) {
        alert("No sequence saved locally!");
        return;
      }
      sequence = JSON.parse(local) as Sequence;
    }
    setSequence(sequence);
  }

  // saves the sequence to local storage
  const saveSequenceLocally = () =>
    localStorage.setItem("sequence", JSON.stringify(sequence));

  // uploads the sequence to the server
  const uploadSequence = async () => {
    const {id, errors} = await SaveExecutableSequence(sequence);
    if (!id && !errors) {
      alert("Failed to reach server!");
    } else if (id !== "") {
      setSequence({
        ...sequence,
        id
      });
    } else {
      alert("Failed to upload sequence, errors: " + errors.join(", "));
    }
  };

  const downloadSequence = () => setOpenDownloadPopup(true);

  const showDetailsPopup = () => setOpenDetailsPopup(true);

  return (
    <Box>
      <SequenceDetailsPopup
        open={openDetailsPopup} setOpen={setOpenDetailsPopup}
        sequence={sequence} setSequence={setSequence}
      />
      <DownloadSequencePopup open={openDownloadPopup} setOpen={setOpenDownloadPopup} setSequence={setSequence}/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SequenceBuilderButtons
            sequence={sequence}
            testSequence={() => console.log("Testing sequence...")}
            saveSequence={saveSequenceLocally}
            loadSequence={loadSequence}
            uploadSequence={uploadSequence}
            downloadSequence={downloadSequence}
            moreDetails={showDetailsPopup}
          />
        </Grid>
        <Grid item xs={3}>
          <ActionsContainer actions={actionCatalogue} addAction={addAction}/>
        </Grid>
        <Grid item xs={6}>
          <SequenceOrder
            actionStringToAction={actionStringToAction}
            actionsToAdd={actionsToAdd}
            setActionsToAdd={setActionsToAdd}
            sequence={sequence}
            setSequence={setSequence}
            selection={selection}
            setSelection={setCurrentSelection}
          />
        </Grid>
        <Grid item xs={3}>
          <ExecutableActionPropertiesView
            selection={selection}
            setSelection={setCurrentSelection}
            findVariablesByType={findVariablesByType}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SequenceBuilderScreen;

