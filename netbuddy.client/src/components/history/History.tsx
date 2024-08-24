import {useState} from "react";
import {Container, Typography} from '@mui/material';
import HistoryTable from "./HistoryTable.tsx";
import {GetResultCount, GetResultRange, SequenceResult} from "../../api/history/history.ts";
import Paper from "@mui/material/Paper";
import SequenceDetailsTable from "./SequenceDetailsTable.tsx";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {usePagination} from "./usePagination.tsx";

const ROWS_PER_PAGE = 10;

const History = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const {loadMore, results, totalCount, isLoading} = usePagination(GetResultRange, GetResultCount, ROWS_PER_PAGE);  
  const [selectedSequence, setSelectedSequence] = useState<SequenceResult | null>(null);

  const handleChangePage = async (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    await loadMore(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const goToSequenceDetails = (id: string) => {
    const sequenceDetails = results.find(r => r.sequenceId === id) || null;
    setSelectedSequence(sequenceDetails);
  };

  const goBackToHistory = () => {
    setSelectedSequence(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        History
      </Typography>
      {selectedSequence ? (
        <Paper elevation={4} style={{ padding: '16px' }}>
          <SequenceDetailsTable
            actions={selectedSequence.results}
            onRowClick={(actionString) => console.log(`Action clicked: ${actionString}`)}
          />
          <Divider style={{ marginTop: '24px', marginBottom: '16px' }} />
          <Button variant="contained" color="secondary" onClick={goBackToHistory}>
            Back to History
          </Button>
        </Paper>
      ) : (
        <HistoryTable
          sequences={results}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          isLoading={isLoading}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onRowClick={goToSequenceDetails}
        />
      )}
    </Container>
  );
}

export default History;