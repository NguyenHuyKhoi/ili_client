import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, {useState, useContext} from 'react';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))


const QuestionDetailTable = (props) => {
  const {players, stage} = props 

  const answerMappingChars = [ 'A', 'B', 'C', 'D']
  const list = players.map((item, index) => {
    let row = {}
    row.playerName = item.name 

    let answerPlayer = stage.answers.find((answer) => answer.socketId == item.socketId)
    if (!answerPlayer) {
      row.answer = 'No answer'
      row.isCorrect = false 
      row.score = 0
      row.time = '--'
    }
    else  {
      row.answer = answerMappingChars[answerPlayer.answerIndex]
      row.isCorrect = answerPlayer.isCorrect
      row.score = answerPlayer.earnScore 
      row.time =answerPlayer.answerTime
    }
    return row 
  })
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Answered</TableCell>
            <TableCell align="right">Correct/incorrect</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(({playerName, answer, isCorrect, score, time}, index) => (
            <TableRow
              key={index + ''}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {playerName}
              </TableCell>
              <TableCell align="right">{answer}</TableCell>
              <TableCell align="right">{isCorrect? 'Correct' : 'Incorrect'}</TableCell>
              <TableCell align="right">{time}</TableCell>
              <TableCell align="right">{score}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionDetailTable