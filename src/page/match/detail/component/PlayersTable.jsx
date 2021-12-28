import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
const useStyles = makeStyles((theme) => ({
}))

const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
	{ field: 'name', headerName: 'Nick name', flex: 3 },
	{ field: 'rank', headerName: 'Rank', type: 'number', flex: 1 },
	{ field: 'correctPercent',headerName: 'Correct answers',type: 'number',flex: 1},
  { field: 'unanswers', headerName: 'Unanswers', type: 'number',flex: 1},
  { field: 'score', headerName: 'Final score', type: 'number',flex: 1}
];

const getRows = (players, match) => {
	return players.map((player, index) => {
		return {
			id: index,
			name: player.name,
			rank: '124',
			correctPercent: 12,
      unanswers: 123,
      score: player.score
		}
	})
}
const PlayersTable = (props) => {
  const {match} = props 
  const {players} = match
  const handleSelectRows = (indexes) => {
    if (indexes.length == 0) return
    if (props.onClickRow) {
        props.onClickRow(indexes[0])
      }
  }

  console.log("layers: ", players)
  return (
    <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
    <DataGrid
      rows={getRows(players)}
      columns={columns.filter((col) => col.hidden != true)}
      pageSize={5}
      rowsPerPageOptions={[5]}
      onSelectionModelChange={handleSelectRows}
      // checkboxSelection
    />
  </div>
  );
}

export default PlayersTable