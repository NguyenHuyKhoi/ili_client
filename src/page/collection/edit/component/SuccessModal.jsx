import { Error } from '@mui/icons-material';
import { Button, Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '40vw',
		backgroundColor: 'white',
		border: '2px solid #000',
		display: 'flex',
		flexDirection: 'column',

    },
	header: {
		padding: theme.spacing(3),
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column'
	},
	body: {
		display: 'flex',
		padding: theme.spacing(3),
		flexDirection: 'column',
		backgroundColor: grey[200],
		overflow: 'auto',
		maxHeight: '50vh'
	},
	footer: {
		padding: theme.spacing(3),
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
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
				<div className = {classes.header}>
					<Typography variant = 'h5' sx = {{fontWeight: 'bold'}}>
						This kahoot is edited successfully
					</Typography>
					<Typography variant = 'caption' sx = {{mt: theme.spacing(2)}}>
						See it now in library
					</Typography>
				</div>
				<div className = {classes.footer}>
					<Button variant="contained" color="success"
						onClick = {handleDone}>
						Done
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default SuccessModal