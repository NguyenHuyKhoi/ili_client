import { Check, Close } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Icon from '../../../../component/Icon';
import { theme } from "../../../../theme";
import { createUrl } from '../../../../util/helper/index';
import { answerStyles } from '../../../question/creator/component/Answers';
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: theme.palette.background.main,
		padding: theme.spacing(2)
	},
	imgContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
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
	}
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

const PicwordQuestionDetailCard = (props) => {
	const classes = useStyles() 
	const {stage, players} = props 
	const {question} = stage
	const {images, answers, correct_answer, time_limit, score} = question
	return (
		<div className = {classes.container}>
			<Typography variant = 'btnLabel' sx = {{color: '#000'}}>
				{'Keyword: ' + correct_answer}
			</Typography>
			<Grid container columnSpacing={2} sx = {{pt: theme.spacing(1)}}>
				{
					images.map((image) => (
						<Grid item xs = {3} >
							<div className = {classes.imgContainer}>
								<img className = {classes.img} 
									alt = 'Hint'
									src = {createUrl(image)}/>
							</div>
						</Grid>
					))
				}
			</Grid>
			<div className = {classes.infors}>
				<InforItem label = {'Time'} value = {time_limit} icon = 'QueryBuilder'/>
				<InforItem label = {'Score'} value = {score} icon = 'MilitaryTech'	/>
			</div>
		</div>
	)
}


export default PicwordQuestionDetailCard