﻿import IconButton from "@mui/material/IconButton";
import ChecklistIcon from '@mui/icons-material/Checklist';
import Tooltip from "@mui/material/Tooltip";
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import Stack from "@mui/material/Stack";
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import Grid from "@mui/material/Grid";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Typography from "@mui/material/Typography";
import {Sequence} from "../../../api/sequences/sequences.ts";

const SequenceBuilderButtons = (props: {
  sequence: Sequence;
  testSequence: () => void;
  saveSequence: () => void;
  loadSequence: () => void;
  uploadSequence: () => void;
  downloadSequence: () => void;
  moreDetails: () => void;
}) => {
  const {
    sequence,
    testSequence, saveSequence, loadSequence, uploadSequence, downloadSequence, moreDetails
  } = props;

  return (
    <Grid container direction="row" spacing={4} justifyContent="center" alignContent="center">
      <Grid item xs={3}>
        <Stack direction="row" alignItems="center">
          <Tooltip title="More Details" followCursor={true}>
            <IconButton onClick={e => {
              e.preventDefault();
              moreDetails();
            }}>
              <MoreVertRoundedIcon/>
            </IconButton>
          </Tooltip>
          <Typography variant="h5">Name: {sequence.name === "" ? "(Not Assigned)" : sequence.name}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={9}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Tooltip title="Test" followCursor={true}>
            <IconButton onClick={e => {
              e.preventDefault();
              testSequence();
            }}>
              <ChecklistIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Save" followCursor={true}>
            <IconButton onClick={e => {
              e.preventDefault();
              saveSequence();
            }}>
              <SaveAltRoundedIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Load" followCursor={true}>
            <IconButton onClick={e => {
              e.preventDefault();
              loadSequence();
            }}>
              <FileOpenRoundedIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload" followCursor={true}>
            <IconButton onClick={e => {
              e.preventDefault();
              uploadSequence();
            }}>
              <CloudUploadRoundedIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Download" followCursor={true}>
            <IconButton onClick={e => {
              e.preventDefault();
              downloadSequence();
            }}>
              <CloudDownloadRoundedIcon/>
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SequenceBuilderButtons;
