import React from 'react';
import {Box, Typography} from '@mui/material';

interface KeyValueDisplayProps {
  data: Record<string, string>;
}

const formatOutput = (data: any, indentLevel = 0): JSX.Element[] => {
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map((item, index) => (
        <Typography
          key={index}
          sx={{ whiteSpace: 'pre-wrap', mb: 1, ml: indentLevel }}
        >
          {formatOutput(item, indentLevel + 1)}
        </Typography>
      ));
    } else {
      return Object.entries(data).map(([key, value]) => (
        <Typography
          key={key}
          sx={{ whiteSpace: 'pre-wrap', mb: 1, ml: indentLevel }}
        >
          {key}: {formatOutput(value, indentLevel + 1)}
        </Typography>
      ));
    }
  }

  return [<span key={data}>{String(data)}</span>];
};

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ data }) => {
  return (
    <Box>
      {Object.entries(data).map(([key, value]) => (
        <Box key={key} sx={{ ml: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {key}:
          </Typography>
          <Box sx={{ ml: 2 }}>
            {formatOutput(JSON.parse(value))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default KeyValueDisplay;