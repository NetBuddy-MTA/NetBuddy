import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container, Paper, Typography} from '@mui/material';
import {PastSequence} from "../../api/sequences/sequences.ts";

interface Action {
  id: string;
  name: string;
  succeeded: boolean;
}

const SequenceHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sequenceDetails: PastSequence = location.state;
  console.log(sequenceDetails)

  const goBack = () => {
    navigate('/history');
  };

  if (!sequenceDetails) {
    return <div>No sequence details...</div>;
  }

  return (
    <Container>
      <Paper elevation={4} style={{padding: '16px'}}>
        <Typography>{sequenceDetails.owner.userName}</Typography>
        <Button variant="contained" color="secondary" onClick={goBack}>
          Back to History
        </Button>
      </Paper>
    </Container>
  );
};

export default SequenceHistory;