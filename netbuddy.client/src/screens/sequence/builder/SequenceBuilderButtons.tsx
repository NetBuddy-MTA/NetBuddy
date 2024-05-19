import IconButton from "@mui/material/IconButton";
import ChecklistIcon from '@mui/icons-material/Checklist';
import Tooltip from "@mui/material/Tooltip";
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import Stack from "@mui/material/Stack";
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const SequenceBuilderButtons = (props: {
  sequenceName: string;
  setSequenceName: (name: string) => void;
  sequenceDescription: string;
  setSequenceDescription: (description: string) => void;
  testSequence: () => void;
  saveSequence: () => void;
  loadSequence: () => void;
  uploadSequence: () => void;
  downloadSequence: () => void;
}) => {
  const {
    sequenceName, setSequenceName,
    sequenceDescription, setSequenceDescription,
    testSequence, saveSequence, loadSequence, uploadSequence, downloadSequence
  } = props;

  return (
    <Grid container direction="row" spacing={4} justifyContent="center">
      <Grid item xs={3}>
        <Stack direction="column">
          <TextField
            id="name"
            label="Name"
            name="name"
            value={sequenceName}
            onChange={e => {
              e.preventDefault();
              setSequenceName(e.target.value);
            }}
          />
          <TextField
            id="description"
            label="Description"
            name="description"
            value={sequenceDescription}
            onChange={e => {
              e.preventDefault();
              setSequenceDescription(e.target.value);
            }}
          />
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
