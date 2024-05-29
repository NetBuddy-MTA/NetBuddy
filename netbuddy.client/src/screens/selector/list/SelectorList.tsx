import Grid from "@mui/material/Grid";
import {Selector} from "../../../api/selectors/selectors.ts";
import UrlAccordion from "./UrlAccordion.tsx";
import SelectorOption from "./SelectorOption.tsx";

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
  return (
    <Grid container direction="column">
      {
        urls.map(url =>
          <Grid item key={url}>
            <UrlAccordion url={url}>
              <>
                {
                  selectors
                  .filter(selector => selector.url === url)
                  .map(selector => <SelectorOption selector={selector} choice={choice} setChoice={setChoice}/>)
                }
              </>
            </UrlAccordion>
          </Grid>)
      }
    </Grid>
  );
};

export default SelectorList;