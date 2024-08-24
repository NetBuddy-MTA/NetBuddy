import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper,
  Collapse, Box, Typography
} from '@mui/material';
import {ActionResult} from "../../api/history/history.ts";
import {formatToIsraelTime} from "./utils/utils.ts";

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

  const handleRowClick = (id: string, index: number) => {
    setExpandedRow(expandedRow === getId(id, index) ? null : getId(id,index));
    onRowClick(id);
  };
  
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom>Actions:</Typography>
      <Table sx={{ '& td, & th': { borderLeft: 1, borderColor: 'divider' } }}>
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
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{action.action.actionString}</TableCell>
                <TableCell>{formatToIsraelTime(action.startAt)}</TableCell>
                <TableCell>{formatToIsraelTime(action.endAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                  <Collapse in={expandedRow === getId(action.action.actionString, index)} timeout="auto" unmountOnExit>
                    <Box margin={2} padding={2} borderRadius={2} border={1} borderColor="#ddd">
                      <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>Action Logs:</Typography>
                      {action.actionLogs.map(log => (
                        <Typography key={log.key}>
                          <strong>{log.key}:</strong> {log.value}
                        </Typography>
                      ))}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SequenceDetailsTable;