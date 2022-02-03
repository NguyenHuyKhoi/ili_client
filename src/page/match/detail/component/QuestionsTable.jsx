import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { theme } from '../../../../theme';
const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
  { field: 'index', headerName: 'Index', flex: 0.5 , headerAlign: 'center', align: 'center' },
	{ field: 'title', headerName: 'Title', flex: 3, headerAlign: 'center', align: 'center' },
  { field: 'type', headerName: 'Type', flex: 1 , headerAlign: 'center', align: 'center'},
  { field: 'time', headerName: 'Time', flex: 1, headerAlign: 'center', align: 'center'},
  { field: 'score', headerName: 'Score', flex: 1, headerAlign: 'center', align: 'center'},
	{ field: 'correctPercent', type: 'number',headerName: 'Correct/incorrect',flex: 1, headerAlign: 'center', align: 'center'},
];


const getRows = (progress, match) => {
	return progress.map((stage, index) => {
    let q =stage.question
    const {correctNum, incorrectNum} = stage
    let answerNum = correctNum + incorrectNum
		return {
			id: index,
      index: index + 1,
			title:  q.title,
      time: q.time_limit + ' s',
      score: q.score + ' pts',
			type: q.typeName,
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