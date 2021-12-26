import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import PlayerDetailModal from './PlayerDetailModal';
const useStyles = makeStyles((theme) => ({
}))

const createData = (nickname, rank, correctAnswersPercent, unansweredNum, finalScore) => {
  return { nickname, rank, correctAnswersPercent, unansweredNum, finalScore };
}
const PlayersTable = (props) => {

  const {match} = props 
  const {players} = match
  const handleClickRow = (index) => {
      if (props.onClickRow) {
        props.onClickRow(index)
      }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nickname</TableCell>
            <TableCell align="right">Rank</TableCell>
            <TableCell align="right">Final Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow
              onClick = {() => handleClickRow(index)}
              key={player.socketId }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>
              <TableCell align="right">{player.rank}</TableCell>
              <TableCell align="right">{player.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlayersTable