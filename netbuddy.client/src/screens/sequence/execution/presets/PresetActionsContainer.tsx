import Grid from "@mui/material/Grid";
import {Preset} from "../../../../api/presets/presets.ts";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import {Sequence} from "../../../../api/sequences/sequences.ts";
import PresetPopup from "./PresetPopup.tsx";
import {useState} from "react";

const PresetActionsContainer = (props: {
  setPreset: (preset: Preset) => void;
  values: Record<string, any>;
  sequence: Sequence;
}) => {
  const {
    setPreset, values, sequence
  } = props;
  const [presetPopupOpen, setPresetPopupOpen] = useState(false);
  const [mode, setMode] = useState<"upload" | "download">("download");

  return (
    <Grid container direction="row" spacing={4} justifyContent="center" alignContent="center">
      <PresetPopup
        sequence={sequence}
        open={presetPopupOpen} setOpen={setPresetPopupOpen}
        setPreset={(preset: Preset | undefined) => {
          if (preset !== undefined) setPreset(preset);
        }}
        mode={mode}
        values={values}
      />
      <Grid item xs={3}>
        <Stack direction="row" alignItems="center">
          <Tooltip title="Save As Preset" followCursor={true}>
            <IconButton onClick={e => {
              e.preventDefault();
              setMode("upload");
              setPresetPopupOpen(true);
            }}>
              <CloudUploadRoundedIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Download" followCursor={true}>
            <IconButton onClick={e => {
              e.preventDefault();
              setMode("download");
              setPresetPopupOpen(true);
            }}>
              <CloudDownloadRoundedIcon/>
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default PresetActionsContainer;