import React, {useState} from 'react';
import {Box, Typography, Divider, Collapse} from '@mui/material';
import {ExpandMore, ExpandLess} from '@mui/icons-material';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  visible: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, visible }) => {
  const [expanded, setExpanded] = useState(false);

  if (!visible) return null;

  const handleToggle = () => setExpanded(!expanded);

  return (
    <Box marginBottom={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleToggle}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="h6">{title}</Typography>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </Box>
      <Divider />
      <Collapse in={expanded}>
        <Box marginTop={2}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CollapsibleSection;