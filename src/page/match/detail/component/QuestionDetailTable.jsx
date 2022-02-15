import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { QUESTION_TYPES_ID } from '../../../../context/question/creator/context';
import { theme } from '../../../../theme';
import { convertAnswerContent } from './PlayerDetailTable';

const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
	{ field: 'playerName', headerName: 'Player', flex: 1.5, headerAlign: 'center', align: 'center' },
	{ field: 'answer', headerName: 'Answered', flex: 3, headerAlign: 'center', align: 'center' },
	{ field: 'isCorrect',headerName: 'Correct/incorrect',flex: 1, headerAlign: 'center', align: 'center'},
  { field: 'answerTime',headerName: 'Time',flex: 1, headerAlign: 'center', align: 'center'},
  { field: 'earnScore',headerName: 'Points',flex: 1, headerAlign: 'center', align: 'center'},
];

const getRows = (players, stage) => {
  const {answers, question} = stage
  let chars = ['A','B','C','D']
	return players.map((player, index) => {
    let answer = answers.find((answer) => answer._id === player._id)

    let ownAnswers = answers.filter((answer) => answer._id == player._id)
    let isWordTable = question.typeId == QUESTION_TYPES_ID.WORD_TABLE

    let wordAnswers =   ownAnswers.length == 0 ? 'No answer' :
      ownAnswers.reduce((str, answer) => str += answer.answerContent + (answer.isCorrect ? '(T)' : '(F)') + ', ', '')

    var wordEarnScores = 0
    ownAnswers.forEach((answer) => {
      if (answer.isCorrect && answer.earnScore) wordEarnScores += answer.earnScore
    })
     console.log("Word earn scores:", wordEarnScores, ownAnswers);
		return {
			id: index,
			playerName: player.username,
      answer: isWordTable ? wordAnswers : 
      ( answer ? convertAnswerContent(answer.answerContent, question.typeId) : 'No answer'),
    isCorrect: isWordTable ? '' :  (answer && answer.isCorrect ? 'Correct': 'Incorrect'),
    answerTime:  isWordTable ? '' : (answer ? answer.answerTime + 's' : '--'),
    earnScore:  (isWordTable ? wordEarnScores : (answer ? answer.earnScore : 0 ) ) + ' pts'
		}
	})
}


const QuestionDetailTable = (props) => {
  const {players, stage} = props 
  return (
    <div style={{ height: theme.spacing(40), width: '100%' }}>
      <DataGrid
        rows={getRows(players, stage)}
        columns={columns.filter((col) => col.hidden !==  true)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={() => {}}
        // checkboxSelection
      />
    </div>
  );
}

export default QuestionDetailTable