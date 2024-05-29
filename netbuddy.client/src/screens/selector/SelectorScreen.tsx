import {useEffect, useState} from "react";
import {GetAllSelectors, Selector} from "../../api/selectors/selectors.ts";
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

export type SelectorScreenProps = {
  open: boolean;
  onClose: () => void;
};

const SelectorScreen = (props: SelectorScreenProps) => {
  const {
    open, onClose
  } = props;

  const [selector, setSelector] = useState<Selector>();
  const [selectors, setSelectors] = useState<Selector[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [mode, setMode] = useState<"list" | "view">("list");
  const [save, setSave] = useState<boolean>(false)

  useEffect(() => {
    // update selector list
    GetAllSelectors().then(setSelectors);
  }, [open]);

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
      <DialogContent>
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
      </DialogActions>
    </Dialog>
  );
}

export default SelectorScreen;