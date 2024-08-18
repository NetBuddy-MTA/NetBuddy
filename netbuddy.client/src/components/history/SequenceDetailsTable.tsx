import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper,
  Collapse, Box, Typography
} from '@mui/material';
import { ExecutableAction } from "../../api/sequences/sequences.ts";

interface SequenceDetailsTableProps {
  actions: ExecutableAction[];
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
      <Typography>Actions:</Typography>
      <Table sx={{ '& td, & th': { borderLeft: 1, borderColor: 'divider' } }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Time of Execution</TableCell>
            <TableCell>Time Ended</TableCell>
            <TableCell>Success</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actions.map(action => (
            <React.Fragment key={action.id}>
              <TableRow
                onClick={() => handleRowClick(action.id)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{action.actionString}</TableCell>
                <TableCell>{new Date(Date.now() - 10 * 60 * 1000).toLocaleString()}</TableCell>
                <TableCell>{new Date().toLocaleString()}</TableCell>
                <TableCell>{1 > 0 ? 'Succeeded' : 'Failed'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                  <Collapse in={expandedRow === action.id} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6">Action Inputs</Typography>
                      {Object.entries(action.inputs).map(([key, value]) => (
                        <Typography key={key}>
                          <strong>{key}:</strong> {value}
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