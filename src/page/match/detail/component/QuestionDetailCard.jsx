import { Add, Check, Close, Square } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
import {createUrl} from '../../../../util/helper/index'
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
		flexDirection: 'row',
		alignItems: 'center'
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

const InforItem = (props) => {
	const classes = useStyles()
	const {value, label} = props
	return (
		<div className = {classes.infor} >
			<Add/>
			<Typography variant = 'subtitle1' sx = {{ml: theme.spacing(1)}}>
				{label}
			</Typography>
			<Typography variant = 'subtitle1' sx = {{ml: theme.spacing(3), fontWeight: 'bold'}}>
				{value}
			</Typography>
		</div>
	)
}

const Answer = (props) => {
	const classes = useStyles()
	const {answer, isCorrect, number, total} = props
	return (
		<div className = {classes.answer}>
			<div className = {classes.logo}>
				<Square sx = {{fontSize: 20, color: 'white'}}/>
			</div>
			<Typography variant = 'subtitle1' sx = {{flex: 1, mx: theme.spacing(1)}}>
				{answer}
			</Typography>
			{
				isCorrect ? 
				<Check sx = {{color: 'green'}}/> 
				:
				<Close sx = {{color: 'red'}}/>
			}
			<div className = {classes.progressContainer}>
				<div className = {classes.progress} style = {{width: `${number/total*100}%`}}/>
			</div>
			<Typography variant = 'subtitle1' >
				{number}
			</Typography>
		</div>
	)
}

const QuestionDetailCard = (props) => {
	const classes = useStyles() 
	const {stage, players} = props 
	const {question} = stage
	const {title, image, answers, correct_answers, time_limit, score} = question
	return (
		<div className = {classes.container}>
			<Grid container >
				<Grid item xs = {3} >
					<div className = {classes.left}>
						<img className = {classes.img} 
							src = {createUrl(image)}/>
					</div>
				</Grid>
				<Grid item xs = {9}>
					<div className = {classes.answers}>
						{
							answers.map((answer, index) => (
								<Answer  
								 	key = {''+index} 
									answer = {answer} 
									isCorrect = {correct_answers.indexOf(index) != -1} 
									number = {stage.answers.filter((answer) => answer.answerIndex == index).length}
									total = {players.length}
									/>
							))
						}
						<Answer  
							answer = {'No answer'} 
							isCorrect = {false} 
							number = {players.length - stage.answers.length}
							total = {players.length}
						/>
					</div>
				</Grid>
			</Grid>
			<div className = {classes.infors}>
				<InforItem label = {'Time'} value = {time_limit} />
				<InforItem label = {'Score'} value = {score}/>
			</div>
		</div>
	)
}


export default QuestionDetailCard