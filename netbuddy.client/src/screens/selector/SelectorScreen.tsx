import {useEffect, useState} from "react";
import {GetAllSelectors, Selector} from "../../api/selectors/selectors.ts";

export type SelectorScreenProps = {
  open: boolean;
  onClose: () => void;
};

const SelectorScreen = (props: SelectorScreenProps) => {
  const {open, onClose} = props;
  const [selectors, setSelectors] = useState<Selector[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

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
    <>
    </>
  );
}

export default SelectorScreen;