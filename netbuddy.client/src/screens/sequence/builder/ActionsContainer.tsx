import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {Action} from "../../../api/actions/actions.ts";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function groupByCategory(items:Action[]) {
  // Use reduce to group the items by category
  const grouped = items.reduce((acc:{[key:string]:Action[]}, item) => {
    // If the category hasn't been seen before, initialize it with an empty array
    if (!acc[item.category]) {
      acc[item.category] = [];
    }

    // Push the current item into the array for its category
    acc[item.category].push(item);
    return acc;
  }, {});

  // Convert the grouped object into an array of arrays
  return Object.values(grouped);
}

const ActionsContainer = (props: {
  actions: Action[],
  addAction: (action: Action) => void
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  
  const {actions, addAction} = props;
  
  useEffect(() => {
  }, [actions]);
  
  const handleAccordionChange = (category: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    return setExpanded(isExpanded ? category : false);
  };
  
  const grouped = groupByCategory(actions);
  
  return (
    <Paper elevation={4}>
      <Typography variant="h4" p={1}>Action Menu:</Typography>
      {grouped.map(actionGroup=> (
        <Accordion 
          expanded={expanded === actionGroup[0].category} 
          onChange={handleAccordionChange(actionGroup[0].category)}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
          >
            {actionGroup[0].category}
          </AccordionSummary>
          <AccordionDetails>
            { 
              actionGroup.map(action => {
                return (
                  <Button onClick={e => {
                    e.preventDefault();
                    addAction(action);
                  }}>
                    {action.displayName}
                  </Button>
                )
              })
            }
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default ActionsContainer;
