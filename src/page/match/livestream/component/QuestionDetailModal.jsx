import { Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import Button from '../../../../component/Button';
import { MatchPlayContext } from '../../../../context/match/play/context';
import { theme } from "../../../../theme";
import QuestionRowItem from '../../../game/detail/component/QuestionRowItem';

/* global gapi */
/* global FB */

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50vw',
		maxHeight: '80vh',
		backgroundColor: 'white',
		borderRadius: theme.spacing(1),
		padding: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',

    },
	leftCol: {
		display: 'flex',
		flexDirection: 'column'
	},
	rightCol: {
		display: 'flex',
		flexDirection: 'column'
	},
	img: {
		width: '100%',
		aspectRatio: 1.6
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: theme.spacing(5)
	},
	uploadImg: {
		width: '100%',
		height: 200,
		border: '1px solid #f2f2f2',
		borderRadius: theme.spacing(1)
	}
}))


const QuestionDetailModal = (props) => {
	const classes = useStyles()
	const {dispatch, question} = useContext(MatchPlayContext)
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
				<Typography variant = 'header' sx = {{ color: '#000'}}>
					Question
				</Typography>
				{
					question != undefined && 
					<QuestionRowItem 
						disable = {true}
						question = {question} 
						index = {0}
						onSelect = {() => {}}
					/>
				}
			
				<div className = {classes.footer}>
					<Button 
						variant="success"
						size = 'small'
						style = {{width: theme.spacing(20)}}
						onClick = {handleClose}
						label = 'Close'/>
				</div>
			</div>
		</Modal>
	);
}

export default QuestionDetailModal