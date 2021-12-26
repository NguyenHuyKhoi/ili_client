import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { selectMatch } from '../../../../context/match/other/actions';
import { MatchContext } from '../../../../context/match/other/context';
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const createData = (name, date, gameMode, playerNum) => {
  return { name, date, gameMode, playerNum };
}


const MatchTable = () => {
	const navigate = useNavigate()
	const {matches, dispatch} = useContext(MatchContext)
	const handleClickRow = (match) => {
		dispatch(selectMatch(match))
		navigate('/match/detail/'+match._id, {replace: false})
	}
	return (
		<TableContainer component={Paper}>
		<Table sx={{ minWidth: 650 }} aria-label="simple table">
			<TableHead>
			<TableRow>
				<TableCell>Name</TableCell>
				<TableCell align="right">Date</TableCell>
				<TableCell align="right">Game Mode</TableCell>
				<TableCell align="right">No. of Players</TableCell>
			</TableRow>
			</TableHead>
			<TableBody>
			{matches.map((match) => (
				<TableRow
				onClick = {() => handleClickRow(match)}
				key={match._id}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
				<TableCell component="th" scope="row">
					{match.game.title}
				</TableCell>
				<TableCell align="right">{match.createAt}</TableCell>
				<TableCell align="right">{'Live'}</TableCell>
				<TableCell align="right">{match.players.length}</TableCell>
				</TableRow>
			))}
			</TableBody>
		</Table>
		</TableContainer>
	);
}

export default MatchTable