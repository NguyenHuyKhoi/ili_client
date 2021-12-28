import { Error } from '@mui/icons-material';
import { Button, Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
import ValidateQuestionItem from './ValidateQuestionItem';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '40vw',
		backgroundColor: '#rgba(0,0,0,0)',
		display: 'flex',
		flexDirection: 'column',

    },
	header: {
		padding: theme.spacing(3),
		borderTopLeftRadius: theme.spacing(1),
		borderTopRightRadius: theme.spacing(1),
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column'
	},
	body: {
		display: 'flex',
		padding: theme.spacing(2),
		flexDirection: 'column',
		backgroundColor: '#F2F2F2',
		overflow: 'auto',
		maxHeight: '50vh'
	},
	question: {
		marginBottom: theme.spacing(2),
	},
	footer: {
		padding: theme.spacing(3),
		borderBottomLeftRadius: theme.spacing(1),
		borderBottomRightRadius: theme.spacing(1),
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	}
}))

const ValidateGameModal = (props) => {
	const classes = useStyles()

	var {open, questions} = props
	if (open == undefined) open = false
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}


	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onBackdropClick = {handleClose}>
			<div className={classes.container}>
				<div className = {classes.header}>
					<Typography variant = 'h5' sx = {{fontWeight: 'bold', color: '#333333'}}>
						This kahoot can't be played
					</Typography>
					<Typography variant = 'subtitl1' sx = {{mt: theme.spacing(2), color: '#5F5F5F'}}>
						All questions need to be completed before you can start playing.
					</Typography>
				</div>
				<div className= {classes.body}>
					{
						questions.map((item, index) => (
							<div className= {classes.question}
							key = {''+index}>
								<ValidateQuestionItem onClick = {() => {
									if (props.onClickQuestion) {
										props.onClickQuestion(index)
									}
								}
								
								}
									question = {item}/>
							</div>
						))
					}
				</div>
				<div className = {classes.footer}>
					<Button variant="contained" color="neutral"
						sx = {{color: '#333333', fontWeight: 'bold', textTransform: 'none'}}
						onClick = {handleClose}>
						Back to Edit
					</Button>
					<Button variant="contained" color="success" 
						sx = {{ml: theme.spacing(2),color: 'white', fontWeight: 'bold', textTransform: 'none'}}
						onClick = {() => {
							if (props.onSaveDraft) props.onSaveDraft()
						}}>
						Keep as draft
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default ValidateGameModal