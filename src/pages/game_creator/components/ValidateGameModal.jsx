import React, {useState, useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography, Button } from '@mui/material';
import { theme } from "../../../theme";
import { TextareaAutosize } from '@mui/base';
import MediaUploadCard from './MediaUploadCard';
import { Add, Error } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
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
	questionContainer: {
		marginBottom: theme.spacing(2),
	},
	footer: {
		padding: theme.spacing(3),
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	question: {
		display: 'flex',
		backgroundColor: 'white',
		borderRadius: theme.spacing(0.5),
		flexDirection: 'column',
	},
	questionHeader: {
		display: 'flex',
		flexDirection: 'row',
		padding: theme.spacing(0.5)
	},
	questionImg: {
		height: 60,
		aspectRatio: 1.6
	},
	questionInfor: {
		marginLeft: theme.spacing(1),
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
	},
	defectives: {
		display: 'flex',
		flexDirection: 'column'
	},
	defectiveContainer: {

	},
	defective: {
		display: 'flex',
		flexDirection: 'row',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		alignItems: 'center',
		borderBottom: '1px solid gray'
	}
}))

const Defective = (props) => {
	const classes = useStyles()
	const {defective} = props
	return (
		<div className= {classes.defective}>
			<Error sx = {{color: 'purple'}}/>
			<Typography variant = 'subtitle1' sx = {{ml: theme.spacing(1)}}>
				{defective}
			</Typography>
		</div>
	)
}

const Question = (props) => {
	const classes = useStyles()
	const {question} = props
	const {title, image, defectives} = question
	const handleClick = () => {
		if (props.onClick) {
			props.onClick()
		}
	}
	return (
		<div className = {classes.question} >
			<div className= {classes.questionHeader}>
				<img src = {image != null && image != undefined ? URL.createObjectURL(image) : null}
					className= {classes.questionImg}/>
				<div className = {classes.questionInfor}>
					<Typography variant = 'subtitle1'>
						1 - Quiz
					</Typography> 
					<Typography variant = 'caption' sx = {{fontWeight: 'bold'}}>
						{
							title == null || title == '' ?
							'Untitled'
							:
							title
						}
					</Typography>
				</div>
				<div >
					<Button variant = 'contained' onClick = {handleClick}>
						Fix
					</Button>
				</div>
				
			</div>
			<div className = {classes.defectives}>
				{
					defectives.map((item, index) => (
						<div className= {classes.defectiveContainer}>
							<Defective defective = {item}/>
						</div>
					))
				}
			</div>
		</div>
	)
}
const ValidateGameModal = (props) => {
	const classes = useStyles()

	var {open, questions} = props
	if (open == undefined) open = false
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}

	const handleClickCancel = () => {
		if (props.onClickCancel) {
			props.onClickCancel()
		}
	}

	const handleClickSaveDraft = () => {
		if (props.onClickSaveDraft) {
			props.onClickSaveDraft()
		}
	}
	const handleClickQuestion = (index) => {
		if (props.onClickQuestion) {
			props.onClickQuestion(index)
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
						This kahoot can't be played
					</Typography>
					<Typography variant = 'caption' sx = {{mt: theme.spacing(2)}}>
						All questions need to be completed before you can start playing.
					</Typography>
				</div>
				<div className= {classes.body}>
					{
						questions.map((item, index) => (
							<div className= {classes.questionContainer}>
								<Question onClick = {() => handleClickQuestion(index)}
									question = {item}/>
							</div>
						))
					}
				</div>
				<div className = {classes.footer}>
					<Button variant="contained" color="neutral"
						onClick = {handleClickCancel}>
						Back to Edit
					</Button>
					<Button variant="contained" color="success" sx = {{ml: theme.spacing(2)}}
						onClick = {handleClickSaveDraft}>
						Keep as draft
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default ValidateGameModal