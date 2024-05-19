import Dialog from "@mui/material/Dialog";
import {GetSequencesDisplay, SequenceDisplay} from "../../../api/sequences/sequences.ts";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {useEffect, useState} from "react";

const DownloadSequencePopup = (props: {
  open: boolean, setOpen: (open: boolean) => void,
  setId: (id: string) => void,
}) => {
  const {open, setOpen, setId} = props;
  const [displaySequences, setDisplaySequences] = useState<SequenceDisplay[]>([]);

  useEffect(() => {
    if (!open) return;
    GetSequencesDisplay().then(setDisplaySequences);
  }, [open]);

  const createHandler = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setId(id);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Choose Sequence to Load:</DialogTitle>
      <DialogContent>
        {displaySequences.map(info => {
          return (
            <Card>
              <CardHeader>
                <Typography variant="h6">{info.name}</Typography>
              </CardHeader>
              <CardContent>
                <Typography variant="body2">{info.description}</Typography>
              </CardContent>
              <CardActions>
                <IconButton type="submit" onClick={createHandler(info.id)}>
                  <CheckCircleOutlineRoundedIcon/>
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button key="cancel" onClick={e => {
          e.preventDefault();
          setOpen(false);
        }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadSequencePopup;