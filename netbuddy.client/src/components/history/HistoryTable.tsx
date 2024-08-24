import React from 'react';
import {Paper, Skeleton, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow} from '@mui/material';
import {SequenceResult} from "../../api/history/history.ts";
import {Sequence} from "../../api/sequences/sequences.ts";
import {formatToIsraelTime} from "./utils/utils.ts";

interface SequenceTableProps {
  sequences: Array<Sequence & SequenceResult>;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick: (id: string) => void;
  isLoading: boolean;
}

const HistoryTable = ({
                        sequences,
                        page,
                        rowsPerPage,
                        totalCount,
                        onPageChange,
                        onRowClick,
                        isLoading,
                      }: SequenceTableProps) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{'& td, & th': {borderLeft: 1, borderColor: 'divider'}}}>
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
              <TableCell><Skeleton/></TableCell>
              <TableCell><Skeleton/></TableCell>
              <TableCell><Skeleton/></TableCell>
            </TableRow>
          )) : sequences.map(sequence => (
            <TableRow
              key={sequence.sequenceId}
              onClick={() => onRowClick(sequence.sequenceId)}
              style={{cursor: 'pointer'}}
            >
              <TableCell>{sequence.name}</TableCell>
              <TableCell>{formatToIsraelTime(sequence.startAt)}</TableCell>
              <TableCell>{formatToIsraelTime(sequence.endAt)}</TableCell>
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
        rowsPerPageOptions={[]}
      />
    </TableContainer>
  );
};

export default HistoryTable;
