import {useEffect, useState} from "react";
import {DeleteSelector, GetAllSelectors, Selector} from "../../api/selectors/selectors.ts";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import SelectorList from "./list/SelectorList.tsx";
import SelectorView from "./editor/SelectorView.tsx";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

export type SelectorScreenProps = {
  open: boolean;
  onClose: () => void;
  setSelection?: (selector?: Selector) => void;
};

const SelectorScreen = (props: SelectorScreenProps) => {
  const {
    open, onClose, setSelection
  } = props;

  const [selector, setSelector] = useState<Selector>();
  const [selectors, setSelectors] = useState<Selector[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [mode, setMode] = useState<"list" | "view">("list");
  const [save, setSave] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (mode === 'list') setRefresh(true);
  }, [mode]);

  useEffect(() => {
    if (!refresh && !open) return;
    setMode("list");
    setSelector(undefined);
    GetAllSelectors().then(setSelectors);
    setRefresh(false);
  }, [refresh, open]);

  useEffect(() => {
    // set urls to unique urls from selectors
    setUrls(
      selectors
      .map(selector => selector.url)
      .filter((url, index, self) => self.indexOf(url) === index)
    );
  }, [selectors]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>
        {mode === "list" ? "Selectors" : "Edit Selector"}
      </DialogTitle>
      <DialogContent style={{overflow: "hidden"}}>
        {
          mode === "list" ?
            <SelectorList urls={urls} selectors={selectors} choice={selector} setChoice={setSelector}/> :
            <SelectorView selector={selector} setSelector={setSelector} save={save} setSave={setSave}/>
        }
      </DialogContent>
      <DialogActions>
        <Tooltip title={mode === "view" ? "Cancel" : "Close"}>
          <IconButton onClick={() => mode === "view" ? setMode("list") : onClose()}>
            <CancelIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Selection">
          <IconButton
            onClick={() => selector !== undefined && DeleteSelector(selector.id).then(() => setRefresh(true))}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
        {
          mode === "view" ?
            <>
              <Tooltip title="Save">
                <IconButton disabled={save} onClick={() => setSave(true)}>
                  <CheckCircleOutlineRoundedIcon/>
                </IconButton>
              </Tooltip>
            </> :
            <>
              <Tooltip title="Edit">
                <IconButton onClick={() => selector && setMode("view")}>
                  <EditRoundedIcon/>
                </IconButton>
              </Tooltip>
            </>
        }
        {
          setSelection !== undefined &&
            <Tooltip title="Select">
                <IconButton onClick={() => {
                  setSelection(selector);
                  onClose();
                }}>
                    <DoneOutlineIcon/>
                </IconButton>
            </Tooltip>
        }
        {
          mode === "list" ?
            <Tooltip title="Refresh">
              <IconButton onClick={() => setRefresh(true)}>
                <RefreshIcon/>
              </IconButton>
            </Tooltip> :
            null
        }
        <Tooltip title="Create New Selector">
          <IconButton>
            <AddIcon/>
          </IconButton>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
}

export default SelectorScreen;