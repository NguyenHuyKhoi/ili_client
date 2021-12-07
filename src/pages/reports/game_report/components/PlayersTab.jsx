import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import PlayerDetailModal from './PlayerDetailModal';
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const createData = (nickname, rank, correctAnswersPercent, unansweredNum, finalScore) => {
  return { nickname, rank, correctAnswersPercent, unansweredNum, finalScore };
}

const rows = [
  createData('Nick name 1', 1, '40%', 3, 1200),
  createData('Nick name 1', 1, '40%', 3, 1200),
  createData('Nick name 1', 1, '40%', 3, 1200),
  createData('Nick name 1', 1, '40%', 3, 1200),
  createData('Nick name 1', 1, '40%', 3, 1200),
  createData('Nick name 1', 1, '40%', 3, 1200),
  createData('Nick name 1', 1, '40%', 3, 1200),
  createData('Nick name 1', 1, '40%', 3, 1200),
];

const PlayersTable = (props) => {
  const handleClickRow = (e) => {
      if (props.onClickRow) {
        props.onClickRow()
      }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nickname</TableCell>
            <TableCell align="right">Rank</TableCell>
            <TableCell align="right">Correct Answers</TableCell>
            <TableCell align="right">Unanswered</TableCell>
            <TableCell align="right">Final Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              onClick = {handleClickRow}
              key={row.nickname}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nickname}
              </TableCell>
              <TableCell align="right">{row.rank}</TableCell>
              <TableCell align="right">{row.correctAnswersPercent}</TableCell>
              <TableCell align="right">{row.unansweredNum}</TableCell>
              <TableCell align="right">{row.finalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const PlayersTab = () => {
  const classes = useStyles()
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const handleCloseModal = () => {
    setOpenDetailModal(false)
  }
  const handleClickRow = () => {
    setOpenDetailModal(true)
  }
  return (
    <div className = {classes.container}>
      <PlayersTable onClickRow = {handleClickRow}/>
      <PlayerDetailModal open = {openDetailModal} onClose = {handleCloseModal}/>
    </div>
  )
}
export default PlayersTab