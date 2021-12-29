import { Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import qr_sample from '../../../../../asset/image/qr_sample.jpg';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '28vw',
		aspectRatio: 1,
		backgroundColor: 'white',
		borderRadius: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',

    },
	qr: {
		flex: 1
	}
}))

const JoinMethodModal = (props) => {
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
				<img src = {qr_sample} className = {classes.qr}/>
			</div>
		</Modal>
	);
}

export default JoinMethodModal