import Dialog from "@mui/material/Dialog";
import {Sequence} from "../../../../api/sequences/sequences";
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
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {CircularProgress, Tooltip} from "@mui/material";
import {DisplayPreset, GetPreset, GetPresets, Preset, PutPreset} from "../../../../api/presets/presets.ts";
import AddIcon from '@mui/icons-material/Add';
import PresetDetailsPopup from "./PresetDetailsPopup.tsx";

const PresetPopup = (props: {
  sequence: Sequence,
  open: boolean,
  setOpen: (open: boolean) => void,
  setPreset: (preset: Preset | undefined) => void,
  mode: "download" | "upload",
  values: Record<string, any>
}) => {
  const {sequence, open, setOpen, setPreset, mode, values} = props;
  const [displayPresets, setDisplayPresets] = useState<DisplayPreset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [presetDetailsOpen, setPresetDetailsOpen] = useState(false);
  const [newPreset, setNewPreset] = useState<Preset>();

  useEffect(() => {
    if (!open) return;

    const getPresetDisplay = async () => {
      try {
        setIsLoading(true);
        const displayPresets = await GetPresets(sequence.id);
        setDisplayPresets(displayPresets ?? []);
      } finally {
        setIsLoading(false);
      }
    }

    getPresetDisplay();
  }, [open]);

  const createHandler = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    GetPreset(id).then(preset => {
      if (preset !== undefined) {
        if (mode === "download") setPreset(preset);
        else if (mode === "upload") {
          const context: Record<string, string> = {};
          for (const key in values) {
            context[key] = JSON.stringify(values[key]);
          }
          PutPreset({...preset, context});
        }
      }
    });
    setOpen(false);
  };

  return (
    <>
      {newPreset !== undefined &&
          <PresetDetailsPopup open={presetDetailsOpen} setOpen={setPresetDetailsOpen} preset={newPreset}
                              setPreset={setNewPreset}/>
      }
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{`Choose preset to ${mode}:`}</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={1}>
            {isLoading ? <Box sx={{display: 'flex', justifyContent: "center"}}>
              <CircularProgress/>
            </Box> : displayPresets.map(info => {
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
          {mode === "upload" &&
              <Tooltip title="Create New Preset">
                  <IconButton onClick={() => {
                    const context: Record<string, string> = {};
                    for (const key in values) {
                      context[key] = JSON.stringify(values[key]);
                    }
                    setNewPreset({id: "", name: "", description: "", sequenceId: sequence.id, context})
                    setPresetDetailsOpen(true);
                    setOpen(false);
                  }}>
                      <AddIcon/>
                  </IconButton>
              </Tooltip>
          }
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PresetPopup;