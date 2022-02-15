import { Divider, Grid, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { QUESTION_TYPES_ID } from '../../../../context/question/creator/context';
import { theme } from "../../../../theme";
import InforRowItem from './InforRowItem';
import MultipleQuestionDetailCard from './MultipleQuestionDetailCard';
import PicwordQuestionDetailCard from './PicwordQuestionDetailCard';
import QuestionDetailTable from './QuestionDetailTable';
import TFQuestionDetailCard from './TFQuestionDetailCard';
import TopBarModal from './TopBarModal';
import WordTableQuestionDetailCard from './WordTableQuestionDetailCard';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '80vw',
		maxHeight: '90vh',
		backgroundColor: 'white',
		borderRadius: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',

    },
	body: {
		flex: 1,
		overflow: 'auto',
	},
	table: {
		padding: theme.spacing(3)
	}
}))

const QuestionDetailModal = (props) => {
	const classes = useStyles()
	const {match} = props 
	const {progress, players} = match 

	const [index, setIndex] = useState(0)
	useEffect(() => {
		setIndex(props.index)
		console.log("Updatet index ", props.index)
		return () => {
			
		}
	}, [props.index])

	var {open} = props
	if (open == undefined) open = false
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}

	const stage = progress[index]
	const {time_limit} = stage.question
	const answerPlayers = stage.answers.length
	let correctAnswerPercent = 0
	let avgAnswerTime = time_limit
	
	if (answerPlayers > 0 ) {
		correctAnswerPercent = Math.floor(stage.answers.filter((answer) => answer.isCorrect).length 
			/ answerPlayers * 100)

		avgAnswerTime = Math.floor(stage.answers.reduce((sumTime, answer) => {
			return sumTime += (time_limit - answer.answerTime)
		}, 0) / answerPlayers)
	} 

	const typeId = stage.question.typeId


	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onBackdropClick = {handleClose}
			> 
			<div className={classes.container}>
				<TopBarModal
					leftLabel = {
						<Typography variant= 'subtitle2' sx = {{color: '#5f5f55'}}>
							{(index + 1) + ' -Quiz'}
						</Typography>
					}
					onClose = {handleClose} 
					onRight = {() => setIndex(index + 1)}
					onLeft = {() => setIndex(index - 1)}
					title = {stage.question.title} 
					index = {index + 1} 
					total = {progress.length}/>
				<Divider/>
				<div className = {classes.body}>
					{
						typeId == QUESTION_TYPES_ID.MULTIPLE_CHOICE ? <MultipleQuestionDetailCard  stage = {stage} players = {players}/> :
						typeId == QUESTION_TYPES_ID.TF_CHOICE ? <TFQuestionDetailCard  stage = {stage} players = {players}/> :
						typeId == QUESTION_TYPES_ID.PIC_WORD ? <PicwordQuestionDetailCard  stage = {stage} players = {players}/> :
						typeId == QUESTION_TYPES_ID.WORD_TABLE ? <WordTableQuestionDetailCard  stage = {stage} players = {players}/> :
						null
					}

	
					<Grid container columnSpacing={5} sx = {{px: theme.spacing(3), mt: theme.spacing(5)}}>
						<Grid item xs = {4}  >
							<InforRowItem 
								label = 'Correct answers: ' 
								value = {correctAnswerPercent + '%'}
								icon = 'Check'
								color = '#D01937'/>
						</Grid>
						<Grid item xs = {4}  >
							<InforRowItem 
								label = 'Avg. answer Time: ' 
								value = {avgAnswerTime + 's'}
								icon = 'WatchLater' 
								color = '#0AA3A3'/>
						</Grid>
						<Grid item xs = {4} >
							<InforRowItem 
								label = 'Player answered ' 
								value = {answerPlayers + ' of ' + players.length}
								icon = 'Person'
								color = '#864cbf'/>
						</Grid>
			
					</Grid>
		
					<div className = {classes.table}>
						<QuestionDetailTable players = {players} stage = {stage} />
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default QuestionDetailModal