import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper,
  TablePagination,
  Skeleton
} from '@mui/material';
import {PastSequence} from "../../api/sequences/sequences.ts";

interface SequenceTableProps {
  sequences: PastSequence[]
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick: (id: string) => void;
  isLoading: boolean;
}

const HistoryTable: React.FC<SequenceTableProps> = ({
       sequences,
       page,
       rowsPerPage,
       totalCount,
       onPageChange,
       onRowsPerPageChange,
       onRowClick, 
       isLoading
     }) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ '& td, & th': { borderLeft: 1 , borderColor: 'divider'} }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Time of Execution</TableCell>
            <TableCell>Time Ended</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? Array.from(new Array(rowsPerPage)).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
            </TableRow>
          )) : sequences.map(sequence => (
            <TableRow
              key={sequence.id}
              onClick={() => onRowClick(sequence.id)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{sequence.owner.userName}</TableCell>
              <TableCell>{new Date(Date.now() - 10 * 60 * 1000).toLocaleString()}</TableCell>
              <TableCell>{new Date().toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default HistoryTable;
