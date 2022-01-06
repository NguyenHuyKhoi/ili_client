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
	{ field: 'question', headerName: 'Question', flex: 3 },
	{ field: 'type', headerName: 'Type', flex: 1},
	{ field: 'answer',headerName: 'Answered',flex: 3},
  { field: 'isCorrect',headerName: 'Correct/incorrect',flex: 2},
  { field: 'answerTime',headerName: 'Time',flex: 1},
  { field: 'earnScore',headerName: 'Points',flex: 1},
];


const getRows = (player, progress) => {
  let chars = ['A','B','C','D']
	return progress.map((stage, index) => {
    let {question, answers} = stage
    let answer = answers.find((answer) => answer._id == player._id)
		return {
			id: index,
			question: question.title,
      type: 'Quiz',
			answer: answer ? chars[answer.answerIndex] + '. ' + question.answers[answer.answerIndex] : 'No answer',
      isCorrect: answer && answer.isCorrect ? 'Correct': 'Incorrect',
      answerTime: answer ? answer.answerTime : '--',
      earnScore: answer ? answer.earnScore : 0
		}
	})
}

const PlayerDetailTable = (props ) => {
  const {progress, player} = props 

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={getRows(player, progress)}
        columns={columns.filter((col) => col.hidden != true)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={() => {}}
        // checkboxSelection
      />
    </div>
  );
}

export default PlayerDetailTable