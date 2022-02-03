import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { QUESTION_TYPES_ID } from '../../../../context/question/creator/context';
const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
	{ field: 'question', headerName: 'Question', flex: 3, headerAlign: 'center', align: 'center' },
	{ field: 'type', headerName: 'Type', flex: 1, headerAlign: 'center', align: 'center'},
	{ field: 'answer',headerName: 'Answered',flex: 4, headerAlign: 'center', align: 'center'
    // renderCell: (params) => {
    //   return (
    //     <Typography sx = {{wordWrap: "break-word"}}>
    //       {params.value}
    //     </Typography>
    //   )
    // }

  },
  { field: 'isCorrect',headerName: 'Correct/incorrect',flex: 1, headerAlign: 'center', align: 'center'},
  { field: 'answerTime',headerName: 'Time',flex: 1,  headerAlign: 'center', align: 'center'},
  { field: 'earnScore',headerName: 'Points',flex: 1, headerAlign: 'center', align: 'center'},
];
export  const convertAnswerContent = (answerContent, questionType) => {
  try {
    var arr
    switch(questionType) {
      case QUESTION_TYPES_ID.MULTIPLE_CHOICE: 
        arr = ['A', 'B', 'C', 'D']
        return arr[parseInt(answerContent)]

      case QUESTION_TYPES_ID.TF_CHOICE: 
        arr = ['True', 'False']
        return arr[parseInt(answerContent)]

      case QUESTION_TYPES_ID.PIC_WORD: 
        return answerContent

      case QUESTION_TYPES_ID.WORD_TABLE: 
        return answerContent
    }
  }
  catch (err) {
    return ''
  }
}

const getRows = (player, progress) => {
 
	return progress.map((stage, index) => {
    let {question, answers} = stage
    let answer = answers.find((answer) => answer._id === player._id)

    let ownAnswers = answers.filter((answer) => answer._id == player._id)
    let isWordTable = question.typeId == QUESTION_TYPES_ID.WORD_TABLE

    let wordAnswers =   ownAnswers.length == 0 ? 'No answer' :
      ownAnswers.reduce((str, answer) => str += answer.answerContent + (answer.isCorrect ? '(T)' : '(F)') + ', ', '')

    var wordEarnScores = 0
    ownAnswers.forEach((answer) => {
      console.log("Check:", answer, answer.earnScore);
      if (answer.isCorrect && answer.earnScore) wordEarnScores += answer.earnScore
    })
     console.log("Word earn scores:", wordEarnScores, ownAnswers);

		return {
			id: index,
			question: question.title,
      type: question.typeName,
			answer: isWordTable ? wordAnswers : 
        ( answer ? convertAnswerContent(answer.answerContent, question.typeId) : 'No answer'),
      isCorrect: isWordTable ? '' :  (answer && answer.isCorrect ? 'Correct': 'Incorrect'),
      answerTime:  isWordTable ? '' : (answer ? answer.answerTime + 's' : '--'),
      earnScore:  (isWordTable ? wordEarnScores : (answer ? answer.earnScore : 0 ) ) + ' pts'
		}
	})
}

const PlayerDetailTable = (props ) => {
  const {progress, player} = props 

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={getRows(player, progress)}
        columns={columns.filter((col) => col.hidden !== true)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={() => {}}
        // checkboxSelection
      />
    </div>
  );
}

export default PlayerDetailTable