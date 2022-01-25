import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { theme } from '../../../../theme';

const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
	{ field: 'username', headerName: 'Nick name', flex: 3 },
	{ field: 'rank', headerName: 'Rank', type: 'number', flex: 1 },
	{ field: 'correctPercent',headerName: 'Correct answers',type: 'number',flex: 1},
  { field: 'unanswers', headerName: 'Unanswers', type: 'number',flex: 1},
  { field: 'score', headerName: 'Final score', type: 'number',flex: 1}
];

const getRows = (players, match) => {
	return players.map((player, index) => {
    const {correctNum, incorrectNum, unanswerNum} = player
    let answerNum = correctNum + incorrectNum
    console.log("Get player: ", player)
		return {
			id: index,
			username: player.username,
			rank: player.rank,
			correctPercent: answerNum === 0? '0 %' : Math.round( 100 * correctNum / answerNum) + ' %',
      unanswers: unanswerNum,
      score: player.score
		}
	})
}
const PlayersTable = (props) => {
  const {match} = props 
  const {players} = match
  const handleSelectRows = (indexes) => {
    if (indexes.length === 0) return
    if (props.onClickRow) {
        props.onClickRow(indexes[0])
      }
  }

  console.log("layers: ", players)
  return (
    <div style={{ height:  theme.spacing(50), width: '100%', backgroundColor: 'white' }}>
    <DataGrid
      rows={getRows(players)}
      columns={columns.filter((col) => col.hidden !== true)}
      pageSize={5}
      rowsPerPageOptions={[5]}
      onSelectionModelChange={handleSelectRows}
      // checkboxSelection
    />
  </div>
  );
}

export default PlayersTable