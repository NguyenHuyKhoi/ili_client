import { Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../../../../component/Link';
import { AuthContext } from '../../../../context/auth/context';
import { selectGame } from '../../../../context/game/other/actions';
import { GameContext } from '../../../../context/game/other/context';
import { MatchContext } from '../../../../context/match/other/context';
import { theme } from '../../../../theme';
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
		flexDirection: 'row'
    },
	left: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		display: 'flex',
		flexDirection: 'column',

	},
	options: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: theme.spacing(10)
	},
	right: {
		display: 'flex',
		flexDirection: 'column'
	}
}))

const Header = () => {
	const classes = useStyles()
	const navigate = useNavigate()
	const {match} = useContext(MatchContext)
	const {user} = useContext(AuthContext)
	const gameDispatch = useContext(GameContext).dispatch
	const {game, startAt } = match

	const [fullGame, setFullGame] = useState(null)
	console.log("Match: ", match)

	useEffect(() => {
		axios.get('game/detail/' + game._id) 
        .then ((res) => {
			console.log("Get game detail ok :", res.data )
			setFullGame(res.data)
			
        })   
		.catch((err) => {
			console.log("Get game detail error: ", err)
		})
		return () => {
			
		}
	}, [])

	const handleViewGame = () => {
		console.log("Selct to vie game:", fullGame)
		if (fullGame != null) {
			gameDispatch(selectGame(fullGame))
			return navigate('/game/detail/' + game._id, {replace: false})
		}
	}

	var isMe = (user._id === match.host.userId)
	return (
		<div className = {classes.container}>
			<Grid container>
				<Grid item xs = {9}>
					<div className = {classes.left}>
						<div className = {classes.title}>
							<Typography variant = 'bigLabel' sx = {{color: '#000'}}>
								{'Hosted by ' + (isMe ? ' Me ' : match.host.username)}
							</Typography>
							<Typography variant = 'bigHeader' sx = {{color: '#000'}}>
								{game.title}
							</Typography>
							
						</div>
						
					</div>
				</Grid>
				<Grid item xs = {3}>
					<div className = {classes.right}>
						<Typography variant = 'btnLabel' sx = {{p: theme.spacing(1.5), color: '##000'}}>
							{'Mode: classic'}
						</Typography>
						<Divider/>
						<Typography variant = 'btnLabel' sx = {{p: theme.spacing(1.5), color: '#000'}}>
							{startAt}
						</Typography>
						<Divider/>
						{
							fullGame != null ?
							<Link 
								label = 'Game' 
								onClick = {handleViewGame} 
								variant = 'btnLabel'
								style = {{padding: theme.spacing(1.5)}}/>
							: 
							<div style = {{height: theme.spacing(5)}}/>
						}
					
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export default Header