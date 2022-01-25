import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { theme } from '../../../../theme';
const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
	{ field: 'title', headerName: 'Title', flex: 4 },
	{ field: 'type', headerName: 'Type', flex: 1 },
	{ field: 'correctPercent', type: 'number',headerName: 'Correct/incorrect',flex: 1},
];


const getRows = (progress, match) => {
	return progress.map((stage, index) => {
    let q =stage.question
    const {correctNum, incorrectNum} = stage
    let answerNum = correctNum + incorrectNum
		return {
			id: index,
			title: q.index + '. ' + q.title,
			type: 'Quiz',
			correctPercent: answerNum ===  0? '0 %' : Math.round( 100 * correctNum / answerNum) + ' %',
		}
	})
}
const QuestionsTable = (props) => {
  const {match} = props 
  const {progress} = match
  const handleSelectRows = (indexes) => {
    if (indexes.length ===  0) return
    if (props.onClickRow) {
      props.onClickRow(indexes[0])
    }
  }

  return (
    <div style={{ height: theme.spacing(50), width: '100%' , backgroundColor: 'white' }}>
      <DataGrid
        rows={getRows(progress)}
        columns={columns.filter((col) => col.hidden !== true)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={handleSelectRows}
        // checkboxSelection
      />
    </div>
  );
}

export default QuestionsTable