import { useState, useEffect } from "react";
import {
  GetExecutableSequence,
  GetSequencesDisplay,
  Sequence,
  SequenceDisplay
} from "../../../api/sequences/sequences.ts";
import { Select, MenuItem, FormControl, InputLabel, Card, CardContent, Typography, SelectChangeEvent } from "@mui/material";

const SequenceExecutionScreen = () => {
  const [sequences, setSequences] = useState<SequenceDisplay[]>([]);
  const [selectedSequenceId, setSelectedSequenceId] = useState<string>("");
  const [sequence, setSequence] = useState<Sequence | null>(null);

  useEffect(() => {
    GetSequencesDisplay().then(setSequences);
  }, []);

  useEffect(() => {
    if (selectedSequenceId) {
      GetExecutableSequence(selectedSequenceId).then(sequence => {
        sequence.actions.forEach((action, index) => action.id = index.toString());
        setSequence(sequence);
      });
    }
  }, [selectedSequenceId]);

  const handleSequenceChange = (event: SelectChangeEvent<string>) => {
    setSelectedSequenceId(event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="sequence-select-label">Select Sequence</InputLabel>
        <Select
          labelId="sequence-select-label"
          value={selectedSequenceId}
          onChange={handleSequenceChange}
          label="Select Sequence"
        >
          {sequences.map(sequence => (
            <MenuItem key={sequence.id} value={sequence.id}>
              {sequence.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {sequence && (
        <Card>
          <CardContent>
            <Typography variant="h5">{sequence.name}</Typography>
            <Typography variant="body2">{sequence.description}</Typography>
            <Typography variant="h6">Actions:</Typography>
            {sequence.actions.map(action => (
              <Typography key={action.id} variant="body2">
                {action.id}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SequenceExecutionScreen;