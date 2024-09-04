import React from 'react';
import { Box, Typography } from '@mui/material';
import { ActionResult } from "../../api/history/history.ts";
import CollapsibleSection from './CollapsibleSection';
import KeyValueDisplay from './KeyValueDisplay';

interface ActionResultDetailsProps {
  actionResult: ActionResult;
}

const ActionResultDetails: React.FC<ActionResultDetailsProps> = ({ actionResult }) => {
  const hasActionContext = Object.keys(actionResult.actionContext).length > 0;
  const hasActionLogs = actionResult.actionLogs.length > 0;
  const hasActionOutputs = Object.keys(actionResult.actionOutputs).length > 0;

  return (
    <Box margin={2} padding={2} borderRadius={2} border={1} borderColor="#ddd">
      <CollapsibleSection title="Action Context" visible={hasActionContext}>
        <KeyValueDisplay data={actionResult.actionContext} />
      </CollapsibleSection>

      <CollapsibleSection title="Action Logs" visible={hasActionLogs}>
        {actionResult.actionLogs.map(log => (
          <Typography key={log.key}>
            <strong>{log.key}:</strong> {log.value}
          </Typography>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Action Outputs" visible={hasActionOutputs}>
        <KeyValueDisplay data={actionResult.actionOutputs} />
      </CollapsibleSection>
    </Box>
  );
};

export default ActionResultDetails;