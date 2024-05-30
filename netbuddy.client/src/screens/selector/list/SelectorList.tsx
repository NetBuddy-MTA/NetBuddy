import Grid from "@mui/material/Grid";
import {Selector} from "../../../api/selectors/selectors.ts";
import UrlAccordion from "./UrlAccordion.tsx";
import SelectorOption from "./SelectorOption.tsx";
import {useState} from "react";

export type SelectorListProps = {
  urls: string[];
  selectors: Selector[];
  choice?: Selector;
  setChoice: (selector?: Selector) => void;
};

const SelectorList = (props: SelectorListProps) => {
  const {
    urls, selectors, choice, setChoice
  } = props;

  const [open, setOpen] = useState<string>();

  return (
    <Grid container direction="column" minWidth={300} spacing={1}>
      {
        urls.map(url =>
          <Grid item key={url}>
            <UrlAccordion url={url} open={open} setOpen={setOpen}>
              <>
                {
                  selectors
                  .filter(selector => selector.url === url)
                  .map(selector => <SelectorOption key={selector.id} selector={selector} choice={choice}
                                                   setChoice={setChoice}/>)
                }
              </>
            </UrlAccordion>
          </Grid>)
      }
    </Grid>
  );
};

export default SelectorList;