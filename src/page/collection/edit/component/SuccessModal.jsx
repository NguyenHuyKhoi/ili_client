import { Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Button from '../../../../component/Button';
import { theme } from "../../../../theme";
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
		alignItems: 'center',
		border: 'solid 2px #000000',
        borderRadius: '255px 5px 225px 5px/5px 225px 5px 255px',
		padding: theme.spacing(2),
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
				<Typography variant = 'header' sx = {{color: '#000'}}>
					Save successfully
				</Typography>
				<Typography variant = 'label' sx = {{mt: theme.spacing(1)}}>
					See results on library.
				</Typography>
				<Button 
					variant="success"
					label = 'Done'
					style = {{width: theme.spacing(15), marginTop: theme.spacing(3)}}
					onClick = {handleDone}/>
			</div>
		</Modal>
	);
}

export default SuccessModal