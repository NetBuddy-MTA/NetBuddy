import { useState } from "react";
import { Container, Typography } from '@mui/material';
import HistoryTable from "./HistoryTable.tsx";
import {getHistory} from "./historyProvider.ts";
import {usePagination} from "./usePagination.tsx";
import {useNavigate} from "react-router-dom";

const ROWS_PER_PAGE = 10;

const History = () => {
  const navigate = useNavigate();
  const {loadMore, results, totalCount, isLoading} = usePagination(getHistory, ROWS_PER_PAGE);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  
  const handleChangePage = async (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
     await loadMore(newPage);
     setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const goToSequenceDetails = (id: string) => {
    navigate(`/history/${id}`, {state: results.find(r => r.id === id)});
  };
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        History
      </Typography>
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
    </Container>
  );
}

export default History;