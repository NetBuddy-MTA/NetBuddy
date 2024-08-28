import React, {useEffect, useState} from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper,
  Collapse, Box, Typography
} from '@mui/material';
import {ActionResult} from "../../api/history/history.ts";
import {formatToIsraelTime} from "./utils/utils.ts";
import agent from "../../api/agent.ts";

interface ActionDetails {
  actionString: string;
  displayName: string;
}

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
  const [actionDetails, setActionDetails] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchActionDetails = async () => {
      try {
        const actionStrings = actions.map(action => action.action.actionString);
        console.log("Fetching details for actionStrings:", actionStrings);

        const response = await agent
        .post<ActionDetails[]>('/info/action', actionStrings)
        .then(response => response?.data);
        
        const detailsMap = response.reduce((acc, detail) => {
          acc[detail.actionString] = detail.displayName;
          return acc;
        }, {} as Record<string, string>);

        console.log("Mapped actionDetails:", detailsMap[0]);

        setActionDetails(detailsMap);
      } catch (error) {
        console.error("Error fetching action details:", error);
      }
    };

    fetchActionDetails();
  }, [actions]);
  
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
                <TableCell>{actionDetails[action.action.actionString] || action.action.actionString}</TableCell>        
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