import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
	{ field: 'playerName', headerName: 'Player', flex: 2 },
	{ field: 'answer', headerName: 'Answered', flex: 2 },
	{ field: 'isCorrect',headerName: 'Correct/incorrect',flex: 2},
  { field: 'answerTime',headerName: 'Time',flex: 1},
  { field: 'earnScore',headerName: 'Points',flex: 1},
];

const getRows = (players, stage) => {
  const {answers, question} = stage
  let chars = ['A','B','C','D']
	return players.map((player, index) => {
    let answer = answers.find((answer) => answer._id == player._id)
		return {
			id: index,
			playerName: player.username,
			answer: answer ? chars[answer.answerIndex] + '. ' + question.answers[answer.answerIndex] : 'No answer',
      isCorrect: answer && answer.isCorrect ? 'Correct': 'Incorrect',
      answerTime: answer ? answer.answerTime : '--',
      earnScore: answer ? answer.earnScore : 0
		}
	})
}


const QuestionDetailTable = (props) => {
  const {players, stage} = props 
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={getRows(players, stage)}
        columns={columns.filter((col) => col.hidden != true)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={() => {}}
        // checkboxSelection
      />
    </div>
  );
}

export default QuestionDetailTable