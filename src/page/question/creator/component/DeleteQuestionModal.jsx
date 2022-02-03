import {  Modal, Typography } from '@mui/material';
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
		width: '30vw',
		backgroundColor: theme.palette.secondary.main,
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
		padding: theme.spacing(3),
		alignItems: 'center'

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
	if (open ===undefined) open = false
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
					{
						canDelete ?
						'Delete?'
						:
						'Can not delete!'
					}
					
				</Typography>
				<Typography variant = 'btnLabel' sx = {{ color: '#000', my: theme.spacing(1)}}>
					{
						canDelete ?
						'This action can\'t be undone.'
						:
						'This is only question.'
					}
					
				</Typography>
				<div className = {classes.footer}>
					{
						canDelete &&
						<Button 
							variant="warning" 	
							color="neutral"
							size = 'small'
							style = {{width: theme.spacing(16)}}
							onClick = {handleClose}
							label = 'Cancel'/>
					}
				
					<Button 
						variant="success" 
						size = 'small'
						style = {{marginLeft: theme.spacing(5), width: theme.spacing(16)}}
						onClick = {
							() => {
								if (props.onDone) props.onDone()
							}
						}
						label = {canDelete? 'Delete' : 'Ok'}/>
				</div>
			</div>
		</Modal>
	);
}

export default DeleteQuestionModal