import React from 'react';
import {Box, Typography} from '@mui/material';

interface KeyValueDisplayProps {
  data: Record<string, string>;
}

const formatOutput = (data: any, indentLevel = 0): JSX.Element[] => {
  const indent = (level: number) => ' '.repeat(level * 4); // Increase indentation level

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map((item, index) => (
        <Typography
          key={index}
          style={{ whiteSpace: 'pre-wrap', marginBottom: '8px' }} // Add space between lines
        >
          {indent(indentLevel)}- {formatOutput(item, indentLevel + 1)}
        </Typography>
      ));
    } else {
      return Object.entries(data).map(([key, value]) => (
        <Typography
          key={key}
          style={{ whiteSpace: 'pre-wrap', marginBottom: '8px' }} // Add space between lines
        >
          {indent(indentLevel)}{key}: {formatOutput(value, indentLevel + 1)}
        </Typography>
      ));
    }
  }

  return [<span key={data}>{String(data)}</span>];
};

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ data }) => {
  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <Box key={key} marginLeft={2}>
          <Typography><strong>{key}:</strong></Typography>
          <Box marginLeft={2}>
            {formatOutput(JSON.parse(value))}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default KeyValueDisplay;