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

const createData = (name, date, gameMode, playerNum) => {
  return { name, date, gameMode, playerNum };
}

const rows = [
  createData('Fincap Friday: Women in the suite', '	December 4, 2021, 3:21 PM', 'Live', 200),
  createData('Fincap Friday: Women in the suite', '	December 4, 2021, 3:21 PM', 'Live', 200),
  createData('Fincap Friday: Women in the suite', '	December 4, 2021, 3:21 PM', 'Live', 200),
  createData('Fincap Friday: Women in the suite', '	December 4, 2021, 3:21 PM', 'Live', 200),
  createData('Fincap Friday: Women in the suite', '	December 4, 2021, 3:21 PM', 'Live', 200),
  createData('Fincap Friday: Women in the suite', '	December 4, 2021, 3:21 PM', 'Live', 200),
  createData('Fincap Friday: Women in the suite', '	December 4, 2021, 3:21 PM', 'Live', 200),
  createData('Fincap Friday: Women in the suite', '	December 4, 2021, 3:21 PM', 'Live', 200),
];

const GameTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Game Mode</TableCell>
            <TableCell align="right">No. of Players</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.gameMode}</TableCell>
              <TableCell align="right">{row.playerNum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GameTable