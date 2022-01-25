import { Modal, Typography } from '@mui/material';
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
		width: '40vw',
		backgroundColor: theme.palette.secondary.main,
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
		padding: theme.spacing(3),
		alignItems: 'center'

    }
}))

const NotificationModal = (props) => {
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
				<Typography variant = 'header' sx = {{color: '#000', alignSelf: 'center'}}>
					{title}
				</Typography>
				<Typography variant = 'btnLabel' sx = {{mt: theme.spacing(1)}}>
					{desc}
				</Typography>
				<Button 
					variant = {variant}
					style = {{width: theme.spacing(20), marginTop: theme.spacing(3)}}
					onClick = {handleDone}
					label = {btnLabel}/>
			</div>
		</Modal>
	);
}

export default NotificationModal