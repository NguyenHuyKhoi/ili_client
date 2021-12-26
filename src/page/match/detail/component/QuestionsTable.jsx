import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import QuestionDetailModal from './QuestionDetailModal';

const useStyles = makeStyles((theme) => ({
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

const QuestionsTable = (props) => {
  const {match} = props 
  const {progress, players} = match
  const handleClickRow = (index) => {
    if (props.onClickRow) {
      props.onClickRow(index)
    }
  }

  const list = progress.map((item) => {
    let row = {}
    row.questionIndex = item.question.index 
    row.questionTitle = item.question.title 
    row.questionType = 'Quiz'
    row.corrects = item.answers.filter((answer) => answer.isCorrect == true ).length 
    row.inCorrects = item.answers.length - row.corrects 
    row.unAnswers = players.length -  item.answers.length 
    return row
  })
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Correct</TableCell>
            <TableCell align="right">InCorrect</TableCell>
            <TableCell align="right">Not answered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(({questionIndex, questionTitle, questionType, 
            corrects, inCorrects, unAnswers}, index) => (
            <TableRow
              onClick = {() => handleClickRow(index)}
              key={index + ''}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${questionIndex}. ${questionTitle}`}
              </TableCell>
              <TableCell align="right">{questionType}</TableCell>
              <TableCell align="right">{corrects}</TableCell>
              <TableCell align="right">{inCorrects}</TableCell>
              <TableCell align="right">{unAnswers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionsTable