import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const createData = (title, type, answer, isCorrect, time, point) => {
  return { title, type, answer, isCorrect, time, point };
}

const rows = [
  createData('How many apple on the table?', 'Quiz', 'A', false, 4, 240),
  createData('How many apple on the table?', 'Quiz', 'A', false, 4, 240),
  createData('How many apple on the table?', 'Quiz', 'A', false, 4, 240)
];

const QuestionDetailTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Answered</TableCell>
            <TableCell align="right">Correct/incorrect</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.nickname}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.answer}</TableCell>
              <TableCell align="right">{row.isCorrect}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.point}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionDetailTable