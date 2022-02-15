import { Divider, Grid, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../component/Button';
import AppLink from '../../../../component/Link';
import { AuthContext } from '../../../../context/auth/context';
import { selectGame } from '../../../../context/game/other/actions';
import { GameContext } from '../../../../context/game/other/context';
import { MatchContext } from '../../../../context/match/other/context';
import { theme } from '../../../../theme';
import { printDate } from '../../../../util/helper';
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
	const {game, startAt, livestream} = match

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

	return (
		<div className = {classes.container}>
			<Grid container>
				<Grid item xs = {9}>
					<div className = {classes.left}>
						<div className = {classes.title}>
							<div style = {{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}>
								<Typography 
									variant = 'bigLabel' 
									sx = {{color: '#000', mr: theme.spacing(2)}}>
									Hosted by 
								</Typography>
								<AppLink
									variant = 'bigLabel'
									link = {'/profiles/'+match.host.userId}
									label = {match.host.name}
								/>
							</div>
						
							
							<Typography variant = 'bigHeader' sx = {{color: '#000'}}>
								{game.title}
							</Typography>
							
						</div>
					</div>
				
				</Grid>
				<Grid item xs = {3}>
					<div className = {classes.right}>
						{
							livestream != null ?
								<div style = {{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									padding: theme.spacing(1.5),
								}}>
									<Typography 
										variant = 'btnLabel' 
										sx = {{color: '#000', mr: theme.spacing(2)}}>
										Link  :  
									</Typography>
									<Link
										href = {livestream.livestreamUrl}
										variant = 'btnLabel'
										underline = 'always'
										sx = {{
											'&:hover': {
												cursor: 'pointer'
											},
											color: theme.palette.success.main
										}}>
										{`Livestream`}
									</Link>
								</div>
								
							:
								<Typography variant = 'btnLabel' sx = {{p: theme.spacing(1.5), color: '##000'}}>
								{'Mode  : classic'}
							</Typography>
						}
						
						<Divider/>
						<Typography variant = 'btnLabel' sx = {{p: theme.spacing(1.5), color: '#000'}}>
							{'Start:' + (startAt != null ? printDate(startAt) : '')}
						</Typography>
						<Divider/>
						{
							fullGame != null ?
							<div style = {{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								padding: theme.spacing(1.5),
							}}>
								<Typography 
									variant = 'btnLabel' 
									sx = {{color: '#000', mr: theme.spacing(2)}}>
									Play  :  
								</Typography>
								<AppLink 
									label = 'Game' 
									onClick = {handleViewGame} 
									variant = 'btnLabel'
									style = {{}}/>
							</div>

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