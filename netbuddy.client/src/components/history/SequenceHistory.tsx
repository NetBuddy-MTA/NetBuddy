import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container, Paper} from '@mui/material';
import {SequenceResult} from "../../api/history/history.ts";
import SequenceDetailsTable from "./SequenceDetailsTable.tsx";
import Divider from "@mui/material/Divider";

const SequenceHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sequenceDetails: SequenceResult = location.state;
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
        <SequenceDetailsTable
          actions={sequenceDetails.results}
          onRowClick={(actionString) => console.log(`Action clicked: ${actionString}`)}
        />
        <Divider style={{ marginTop: '24px', marginBottom: '16px' }} />
        <Button variant="contained" color="secondary" onClick={goBack}>
          Back to History
        </Button>
      </Paper>
    </Container>
  );
};

export default SequenceHistory;