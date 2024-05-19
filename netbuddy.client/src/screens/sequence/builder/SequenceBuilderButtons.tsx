import IconButton from "@mui/material/IconButton";
import ChecklistIcon from '@mui/icons-material/Checklist';
import Tooltip from "@mui/material/Tooltip";
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import Stack from "@mui/material/Stack";
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';

const SequenceBuilderButtons = (props: {
  testSequence: () => void;
  saveSequence: () => void;
  loadSequence: () => void;
  uploadSequence: () => void;
  downloadSequence: () => void;
}) => {
  const {testSequence, saveSequence, loadSequence, uploadSequence, downloadSequence} = props;

  return (
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
  );
};

export default SequenceBuilderButtons;
