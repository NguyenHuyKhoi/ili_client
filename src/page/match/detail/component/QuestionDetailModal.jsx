import { Add, ChevronLeft, ChevronRight, Close, Square } from '@mui/icons-material';
import { Divider, Grid, Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, {useState, useContext, useEffect} from 'react';
import { theme } from "../../../../theme";
import InforRowItem from './InforRowItem';
import PlayerDetailTable from './PlayerDetailTable';
import QuestionDetailCard from './QuestionDetailCard';
import QuestionDetailTable from './QuestionDetailTable';
import TopBarModal from './TopBarModal';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '80vw',
		maxHeight: '80vh',
		backgroundColor: 'white',
		border: '2px solid #000',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',

    },
	body: {
		flex: 1,
		overflow: 'auto',
	},
	table: {
		padding: theme.spacing(3)
	},
	infors: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing(1)
	},
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
		correctAnswerPercent = stage.answers.filter((answer) => answer.isCorrect).length 
			/ answerPlayers * 100

		avgAnswerTime = stage.answers.reduce((sumTime, answer) => {
			return sumTime += (time_limit - answer.answerTime)
		}, 0) / answerPlayers
	} 


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
					onClose = {handleClose} 
					onRight = {() => setIndex(index + 1)}
					onLeft = {() => setIndex(index - 1)}
					title = {stage.question.index + '. ' + stage.question.title} 
					index = {index + 1} 
					total = {progress.length}/>
				<Divider/>
				<div className = {classes.body}>
					<QuestionDetailCard stage = {stage} players = {players}/>

					<div className = {classes.infors}>
						<Grid item xs = {4}  >
							<InforRowItem 
								label = 'Correct answers: ' 
								value = {correctAnswerPercent + '%'}/>
						</Grid>
						<Grid item xs = {4}  >
							<InforRowItem 
								label = 'Avg. answer Time: ' 
								value = {avgAnswerTime + 's'}/>
						</Grid>
						<Grid item xs = {4} >
							<InforRowItem 
								label = 'Player answered ' 
								value = {answerPlayers + ' of ' + players.length}/>
						</Grid>
					</div>
					<div className = {classes.table}>
						<QuestionDetailTable players = {players} stage = {stage} />
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default QuestionDetailModal