import Dialog from "@mui/material/Dialog";
import {
  GetExecutableSequence,
  GetSequencesDisplay,
  Sequence,
  SequenceDisplay
} from "../../../api/sequences/sequences.ts";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {FC, useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const ExecutionScreen: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [displaySequences, setDisplaySequences] = useState<SequenceDisplay[]>([]);
  const [sequence, setSequence] = useState<Sequence | null>(null);

  useEffect(() => {
    if (!open) return;
    GetSequencesDisplay().then(setDisplaySequences);
  }, [open]);

  const createHandler = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    GetExecutableSequence(id).then(sequence => {
      sequence.actions.forEach((action, index) => action.id = index.toString());
      setSequence(sequence);
    });
    setOpen(false);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" justifyItems="center" alignItems="center" mb={2}>
        <Typography variant="body1" mr={1}>Selected Sequence: {sequence?.name}</Typography>
        <Button onClick={() => setOpen(true)}>Click me im pretty🐱‍👤</Button>
      </Box>
      <Dialog open={isOpen} onClose={() => setOpen(false)}>
        <DialogTitle>Choose Sequence to Load:</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={1}>
            {displaySequences.map(info => {
              return (
                <Card key={info.id}>
                  <CardContent>
                    <Typography variant="h5">{info.name}</Typography>
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
          </Stack>
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
      {sequence && (
        <Paper elevation={3} sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h5">{sequence.name}</Typography>
              <Typography variant="body2">{sequence.description}</Typography>
              <Typography variant="h6">Actions:</Typography>
              {sequence.actions?.map(action => (
                <Typography key={action.id} variant="body2">
                  {action.id}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Paper>
      )}
    </div>
  );
};

export default ExecutionScreen;