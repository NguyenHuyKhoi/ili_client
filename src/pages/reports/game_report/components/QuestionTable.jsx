import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const createData = (title, type, correctPlayersNum, incorrectPlayersNum) => {
  return { title, type, correctPlayersNum, incorrectPlayersNum};
}

const rows = [
  createData('How many apple on the table?', 'Quiz', 0, 3),
  createData('How many apple on the table?', 'Quiz', 0, 3),
  createData('How many apple on the table?', 'Quiz', 0, 3),
  createData('How many apple on the table?', 'Quiz', 0, 3),
  createData('How many apple on the table?', 'Quiz', 0, 3),
  createData('How many apple on the table?', 'Quiz', 0, 3),
  createData('How many apple on the table?', 'Quiz', 0, 3),
  createData('How many apple on the table?', 'Quiz', 0, 3)
];

const QuestionTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Correct/incorrect</TableCell>
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
              <TableCell align="right">{row.correctPlayersNum + '/' + row.incorrectPlayersNum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionTable