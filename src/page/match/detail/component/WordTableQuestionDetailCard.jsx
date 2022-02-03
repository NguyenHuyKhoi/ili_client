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
	keywords: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	keyword: {
		padding: theme.spacing(2),
		paddingBottom: theme.spacing(0.5),
		paddingTop: theme.spacing(0.5),
		border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
		backgroundColor: theme.palette.success.main,
		margin: theme.spacing(1)
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

const WordTableQuestionDetailCard = (props) => {
	const classes = useStyles() 
	const {stage, players} = props 
	const {question} = stage
	const {image, answers, correct_answers, time_limit, score} = question
	return (
		<div className = {classes.container}>
			<div className= {classes.keywords}>
			{
				correct_answers.map((keyword) => (
					<div className = {classes.keyword}>
						<Typography variant='btnLabel' sx = {{color: '#000'}}>
							{keyword}
						</Typography>
					</div>
				))
			}
			</div>
			
			<div className = {classes.infors}>
				<InforItem label = {'Time'} value = {time_limit} icon = 'QueryBuilder'/>
				<InforItem label = {'Score'} value = {score} icon = 'MilitaryTech'	/>
			</div>
		</div>
	)
}


export default WordTableQuestionDetailCard