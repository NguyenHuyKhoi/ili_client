import { CircularProgress, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Button from './Button';
import { theme } from "../theme";
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
    }
}))

const LoadingModal = (props) => {
	const classes = useStyles()

	var {open, title, desc, btnLabel, variant} = props
	if (variant ===undefined) variant = 'success'
	if (open ===undefined) open = false
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
				<CircularProgress 
					color = 'success' 
					style = {{
						width: theme.spacing(10), 
						height: theme.spacing(10)}}
				/>
				
			</div>
		</Modal>
	);
}

export default LoadingModal