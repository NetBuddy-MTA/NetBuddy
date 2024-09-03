import React, {useState} from 'react';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {ActionResult} from "../../api/history/history.ts";
import {formatToIsraelTime} from "./utils/utils.ts";
import ActionResultDetails from "./ActionResultDetails.tsx";

interface SequenceDetailsTableProps {
  actions: ActionResult[];
  onRowClick: (id: string) => void;
}

const getId = (action: string, index: number) => `${action}-${index}`;

const SequenceDetailsTable: React.FC<SequenceDetailsTableProps> = ({
                                                                     actions,
                                                                     onRowClick,
                                                                   }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  console.log(actions[0].actionOutputs);
  
  const handleRowClick = (id: string, index: number) => {
    setExpandedRow(expandedRow === getId(id, index) ? null : getId(id, index));
    onRowClick(id);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Actions:</Typography>
      <TableContainer sx={{ width: '100%', marginTop: 2 }}>
        <Table sx={{'& td, & th': {borderLeft: 1, borderColor: 'divider'}}}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Time of Execution</TableCell>
              <TableCell>Time Ended</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map((action, index) => (
              <React.Fragment key={action.action.actionString}>
                <TableRow
                  onClick={() => handleRowClick(action.action.actionString, index)}
                  style={{cursor: 'pointer'}}
                >
                  <TableCell>
                    {action.action.actionString
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                    }
                  </TableCell>
                  <TableCell>{formatToIsraelTime(action.startAt)}</TableCell>
                  <TableCell>{formatToIsraelTime(action.endAt)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={expandedRow === getId(action.action.actionString, index)} timeout="auto" unmountOnExit>
                      <ActionResultDetails actionResult={action} />
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SequenceDetailsTable;