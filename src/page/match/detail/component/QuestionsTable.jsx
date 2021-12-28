import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const useStyles = makeStyles((theme) => ({
}))

const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
	{ field: 'title', headerName: 'Title', flex: 4 },
	{ field: 'type', headerName: 'Type', flex: 1 },
	{ field: 'correctPercent', type: 'number',headerName: 'Correct/incorrect',flex: 1},
];


const getRows = (progress, match) => {
	return progress.map((stage, index) => {
    let q =stage.question
		return {
			id: index,
			title: q.index + '. ' + q.title,
			type: 'Quiz',
			correctPercent: 12
		}
	})
}
const QuestionsTable = (props) => {
  const {match} = props 
  const {progress, players} = match
  const handleSelectRows = (indexes) => {
    if (indexes.length == 0) return
    if (props.onClickRow) {
      props.onClickRow(indexes[0])
    }
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={getRows(progress)}
        columns={columns.filter((col) => col.hidden != true)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={handleSelectRows}
        // checkboxSelection
      />
    </div>
  );
}

export default QuestionsTable