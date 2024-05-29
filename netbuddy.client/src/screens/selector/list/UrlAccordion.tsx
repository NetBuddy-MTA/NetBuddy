import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {jsx} from "@emotion/react";
import AccordionDetails from "@mui/material/AccordionDetails";
import JSX = jsx.JSX;

const UrlAccordion = ({url, children}: { url: string, children: JSX.Element }) => {
  return (
    <Accordion>
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