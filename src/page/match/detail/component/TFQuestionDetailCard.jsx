import { Check, Close } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Icon from '../../../../component/Icon';
import { theme } from "../../../../theme";
import { createUrl } from '../../../../util/helper/index';
import { answerStyles } from '../../../game/creator/component/Answers';
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: theme.palette.background.main,
		padding: theme.spacing(2)
	},
	left: {
		display: 'flex',
		flexDirection: 'column',
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
		padding: theme.spacing(0.8),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	logo: {
		width: theme.spacing(3.5),
		height: theme.spacing(3.5),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: theme.spacing(0.2)
	},
	infors: {
		display: 'flex',
    	flexDirection: 'row',
    	justifyContent: 'space-between',
		marginTop: theme.spacing(1)
	},
  	infor: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	progressContainer: {
		width:theme.spacing(25),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	progress: {
		height: theme.spacing(1),
		borderRadius: theme.spacing(1),
		backgroundColor: '#D01937',
	},
}))

const InforItem = (props) => {
	const classes = useStyles()
	const {value, label, icon} = props
	return (
		<div className = {classes.infor} >
			<Icon name = {icon} style = {{fontSize: 25, color: '#000'}}/>
			<Typography variant = 'btnLabel' sx = {{ml: theme.spacing(1), color: '#000'}}>
				{label + ': ' + value}
			</Typography>
		</div>
	)
}

const Answer = (props) => {
	const classes = useStyles()
	const {answer, isCorrect, number, total, style, isLast} = props
	const {icon, color} = style 
	return (
		<div className = {classes.answer} 
			style = {{
				borderBottom: isLast? 'none' : '1px solid #CCCCCC'
			}}>
			<div className = {classes.logo} style = {{backgroundColor: color}}>
				{
					icon && 
					<Icon name = {icon} style = {{fontSize: 20, color: 'white'}}/>
				}
			</div>
			<Typography variant = 'btnLabel' sx = {{flex: 1, mx: theme.spacing(1.5), color: '#000'}}>
				{answer}
			</Typography>
			{
				isCorrect ? 
				<Check sx = {{color: theme.palette.success.main, fontSize: 30}}/> 
				:
				<Close sx = {{color: theme.palette.error.main, fontSize: 30}}/>
			}
			<div className = {classes.progressContainer}>
				<div className = {classes.progress} style = {{width: `${number/total*100}%`}}/>
			</div>
			<Typography variant = 'btnLabel' sx = {{color: '#000'}} >
				{number}
			</Typography>
		</div>
	)
}

const TFQuestionDetailCard = (props) => {
	const classes = useStyles() 
	const {stage, players} = props 
	const {question} = stage
	const {image, answers, correct_answer, time_limit, score} = question
	return (
		<div className = {classes.container}>
			<Grid container >
				<Grid item xs = {3} >
					<div className = {classes.left}>
						<img className = {classes.img} 
							alt = 'Hint'
							src = {createUrl(image)}/>
					</div>
				</Grid>
				<Grid item xs = {9}>
					<div className = {classes.answers}>
						{
							answers.map((answer, index) => (
								<Answer  
									style = {answerStyles[index]}
								 	key = {''+index} 
									answer = {answer} 
									isCorrect = {correct_answer ==  index} 
									number = {stage.answers.filter((answer) => answer.answerContent ==  index).length}
									total = {players.length}
									/>
							))
						}
						<Answer  
							answer = {'No answer'} 
							isCorrect = {false} 
							number = {players.length - stage.answers.length}
							total = {players.length}
							style = {{icon: null, color: 'white'}}
							isLast = {true}
						/>
					</div>
				</Grid>
			</Grid>
			<div className = {classes.infors}>
				<InforItem label = {'Time'} value = {time_limit} icon = 'QueryBuilder'/>
				<InforItem label = {'Score'} value = {score} icon = 'MilitaryTech'	/>
			</div>
		</div>
	)
}


export default TFQuestionDetailCard