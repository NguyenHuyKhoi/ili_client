import { Error } from '@mui/icons-material';
import { Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Button from '../../../../component/Button';
import { theme } from "../../../../theme";
import ValidateQuestionItem from './ValidateQuestionItem';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50vw',
		backgroundColor: theme.palette.secondary.main,
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    },
	body: {
		display: 'flex',
		margin: theme.spacing(5),
		flexDirection: 'column',
		overflow: 'auto',
		maxHeight: '60vh'
	},
	question: {
		marginBottom: theme.spacing(3),
	},
	footer: {
		paddingBottom: theme.spacing(3),
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
				<Typography variant = 'bigLabel' sx = {{color: '#000', alignSelf: 'center', pt: theme.spacing(3)}}>
					Fix them!!!
				</Typography>
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
									question = {item}
									index = {index}/>
							</div>
						))
					}
				</div>
				<div className = {classes.footer}>
					<Button 
						variant="warning"
						onClick = {() => {
							if (props.onSaveDraft) props.onSaveDraft()
						}}
						label = 'Save draft'
						style = {{width: theme.spacing(16)}}
						size = 'small'/>
					
					<Button 
						variant = "success" 
						style = {{marginLeft: theme.spacing(5), width: theme.spacing(16)}}
						onClick = {handleClose}
						size = 'small'
						label = 'Fix'/>
				</div>
			</div>
		</Modal>
	);
}

export default ValidateGameModal