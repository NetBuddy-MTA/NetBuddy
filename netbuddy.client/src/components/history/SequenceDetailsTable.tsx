import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper,
  Collapse, Box, Typography
} from '@mui/material';
import {ActionResult, formatToIsraelTime} from "../../api/history/history.ts";

interface SequenceDetailsTableProps {
  actions: ActionResult[];
  onRowClick: (id: string) => void;
}

const SequenceDetailsTable: React.FC<SequenceDetailsTableProps> = ({
                                             actions,
                                             onRowClick,
                                           }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
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
          {actions.map(action => (
            <React.Fragment key={action.action.actionString}>
              <TableRow
                onClick={() => handleRowClick(action.action.actionString)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{action.action.actionString}</TableCell>
                <TableCell>{formatToIsraelTime(action.startAt)}</TableCell>
                <TableCell>{formatToIsraelTime(action.endAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                  <Collapse in={expandedRow === action.action.actionString} timeout="auto" unmountOnExit>
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