import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {useEffect, useState} from "react";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {Sequence} from "../../../api/sequences/sequences.ts";

const SequenceDetailsPopup = (props: {
  open: boolean, setOpen: (open: boolean) => void,
  sequence: Sequence, setSequence: React.Dispatch<React.SetStateAction<Sequence>>
}) => {
  const {
    open, setOpen,
    sequence, setSequence
  } = props;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(sequence.name);
  const [editDescription, setEditDescription] = useState<string>(sequence.description);

  useEffect(() => {
    setEditMode(false);
    setEditName(sequence.name);
    setEditDescription(sequence.description);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Sequence Details:</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2}>
          <TextField
            disabled={!editMode}
            autoFocus
            id="name"
            name="name"
            label="Name"
            type="text"
            variant="standard"
            value={editName}
            onChange={e => setEditName(e.target.value)}
          />
          <TextField
            disabled={!editMode}
            autoFocus
            id="description"
            name="description"
            label="Description"
            type="text"
            multiline
            variant="standard"
            minRows={2}
            maxRows={6}
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Tooltip title={editMode ? "Save Changes" : "Edit"}>
          <IconButton onClick={e => {
            e.preventDefault();
            if (editMode) {
              setEditMode(false);
              setSequence({...sequence, name: editName, description: editDescription});
            } else {
              setEditName(sequence.name);
              setEditDescription(sequence.description);
              setEditMode(true);
            }
          }}>
            {editMode ? <CheckCircleOutlineRoundedIcon/> : <EditRoundedIcon/>}
          </IconButton>
        </Tooltip>
      </DialogActions>
    </Dialog>
  )
};

export default SequenceDetailsPopup;
