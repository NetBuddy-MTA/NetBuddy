import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {jsx} from "@emotion/react";
import AccordionDetails from "@mui/material/AccordionDetails";
import JSX = jsx.JSX;

const UrlAccordion = ({url, open, setOpen, children}: {
  url: string, open?: string, setOpen: (open?: string) => void, children: JSX.Element
}) => {
  return (
    <Accordion expanded={open === url} onChange={() => setOpen(open === url ? undefined : url)}>
      <AccordionSummary expandIcon={<ExpandMore/>}>
        <Typography variant="h6">
          {url}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default UrlAccordion;