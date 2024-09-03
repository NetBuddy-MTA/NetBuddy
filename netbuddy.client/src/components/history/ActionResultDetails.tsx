import React from 'react';
import { Box, Typography } from '@mui/material';
import { ActionResult } from "../../api/history/history.ts";

interface ActionResultDetailsProps {
  actionResult: ActionResult;
}

const ActionResultDetails: React.FC<ActionResultDetailsProps> = ({ actionResult }) => {
  return (
    <Box margin={2} padding={2} borderRadius={2} border={1} borderColor="#ddd">
      <Typography variant="h6">Action Logs:</Typography>
      {actionResult.actionLogs.map(log => (
        <Typography key={log.key}>
          <strong>{log.key}:</strong> {log.value}
        </Typography>
      ))}
    </Box>
  );
};

export default ActionResultDetails;
