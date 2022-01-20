import { Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
import QuestionTypeList from './QuestionTypeList';
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
		padding: theme.spacing(3)
    }
}))

const SelectQuestionTypeModal = (props) => {
	const classes = useStyles()

	var {open} = props
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
				<Typography variant = 'bigHeader' sx = {{color: '#000', alignSelf: 'center'}}>
					Select 
				</Typography>
				<QuestionTypeList onSelect = {(id) => {
					if (props.onSelectType) {
						props.onSelectType(id)
					}
				}}/>
			</div>
		</Modal>
	);
}

export default SelectQuestionTypeModal