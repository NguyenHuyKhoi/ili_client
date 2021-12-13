import { Add, Close, Square } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: grey[100]
	},
	left: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(1),
		justifyContent: 'center'
	},
	answers: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: theme.spacing(1)
	},
	answer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: theme.spacing(1)
	},
	logo: {
		width: theme.spacing(3),
		height: theme.spacing(3),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
		borderRadius: theme.spacing(0.2)
	},
	infors: {
		display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
	},
  infor: {
		display: 'flex',
		flexDirection: 'row'
	},
	progressContainer: {
		width:theme.spacing(20),
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2)
	},
	progress: {
		height: theme.spacing(1),
		borderRadius: theme.spacing(1),
		backgroundColor: 'red',
	},
}))

const InforItem = () => {
	const classes = useStyles()
	return (
		<div className = {classes.infor} >
			<Add/>
			<Typography variant = 'subtitle1'>
				20 time limit
			</Typography>
		</div>
	)
}

const Answer = () => {
	const classes = useStyles()
	return (
		<div className = {classes.answer}>
			<div className = {classes.logo}>
				<Square sx = {{fontSize: 20, color: 'white'}}/>
			</div>
			<Typography variant = 'subtitle1' sx = {{flex: 1, mx: theme.spacing(1)}}>
				The answer 1 
			</Typography>
			<Close sx = {{color: 'red'}}/>
			<div className = {classes.progressContainer}>
				<div className = {classes.progress} style = {{width: `${20}%`}}/>
			</div>
			<Typography variant = 'subtitle1' >
				3
			</Typography>
		</div>
	)
}

const QuestionDetailCard = () => {
	const classes = useStyles() 
	return (
		<div className = {classes.container}>
			<Grid container >
				<Grid item xs = {3} >
					<div className = {classes.left}>
						<img className = {classes.img} src = 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR253HHauiRc70TkCw85lagWrKKeQdnRXv4uak2fjdGGTzA30Qdq-Ra32aQVF1EO6QzsWTuXk8w42_uDGtz6Ps'/>
					</div>
				</Grid>
				<Grid item xs = {9}>
					<div className = {classes.answers}>
						{
							Array.from(Array(5)).map((_, index) => (
								<Answer />
							))
						}
					</div>
				</Grid>
			</Grid>
			<div className = {classes.infors}>
				{
					Array.from(Array(3)).map((_, index) => (
						<InforItem/>
					))
				}
			</div>
		</div>
	)
}


export default QuestionDetailCard