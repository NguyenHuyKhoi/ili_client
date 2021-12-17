import { Button, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '30vw',
		backgroundColor: 'white',
		border: '2px solid #000',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',

    },
	footer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: theme.spacing(3)
	},
}))

const DeleteQuestionModal = (props) => {
	const classes = useStyles()
	var {open, canDelete} = props
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
				<Typography variant = 'h5' sx = {{fontWeight: 'bold', color: 'black'}}>
					{
						canDelete ?
						'Delete Quiz Question'
						:
						'Can\'t not delete only question in your kahoot'
					}
					
				</Typography>
				<Typography variant = 'caption' sx = {{ color: 'black', my: theme.spacing(4)}}>
					{
						canDelete ?
						'Are you sure you want to delete this question? This action can\'t be undone.'
						:
						'To make a game engaging, we recommend adding at least a question.'
					}
					
				</Typography>
				<div className = {classes.footer}>
					{
						canDelete &&
						<Button variant="contained" color="neutral"
							onClick = {handleClose}>
							Cancel
						</Button>
					}
				
					<Button variant="contained" color="success" sx = {{ml: theme.spacing(2)}}
						onClick = {
							() => {
								if (props.onDone) props.onDone()
							}
						}>
						{
							canDelete? 
							'Delete'
							:
							'OK'
						}
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default DeleteQuestionModal