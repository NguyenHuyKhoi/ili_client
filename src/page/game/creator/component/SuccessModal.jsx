import { Error } from '@mui/icons-material';
import {Modal, Typography } from '@mui/material';
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
		width: '40vw',
		backgroundColor: theme.palette.secondary.main,
		border: '2px solid #000',
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
		padding: theme.spacing(3),
		alignItems: 'center'

    }
}))

const SuccessModal = (props) => {
	const classes = useStyles()

	var {open} = props
	if (open == undefined) open = false
	const handleDone = () => {
		if (props.onDone) {
			props.onDone()
		}
	}

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
				<Typography variant = 'header' sx = {{color: '#000', alignSelf: 'center'}}>
					Done!
				</Typography>
				<Typography variant = 'btnLabel' sx = {{mt: theme.spacing(1)}}>
					See result in library.
				</Typography>
				<Button 
					variant="success" 
					style = {{width: theme.spacing(20), marginTop: theme.spacing(3)}}
					onClick = {handleDone}
					label = 'Done'/>
			</div>
		</Modal>
	);
}

export default SuccessModal