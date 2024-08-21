import React, {useEffect, useState} from 'react';
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import {formatToIsraelTime, SequenceResult} from "../../api/history/history.ts";
import {GetExecutableSequence, Sequence} from "../../api/sequences/sequences.ts";

interface SequenceTableProps {
  sequences: SequenceResult[]
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
                        isLoading
                      }: SequenceTableProps) => {

  const [resultsWithInfo, setResultsWithInfo] = useState<(Sequence & SequenceResult)[]>([])

  useEffect(() => {
    const sequenceInfoPromises = sequences.map(curr => GetExecutableSequence(curr.sequenceId));
    let newResultsWithInfo: (Sequence & SequenceResult)[] = [];
    Promise.all(sequenceInfoPromises)
    .then(infoArr => {
      for (let i = 0; i < sequences.length; i++) {
        newResultsWithInfo.push({...sequences[i], ...infoArr[i]})
      }
      setResultsWithInfo(newResultsWithInfo);
    })
  }, [sequences]);

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
          )) : resultsWithInfo.map(sequence => (
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
