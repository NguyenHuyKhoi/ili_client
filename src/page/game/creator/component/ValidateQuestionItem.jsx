import { Error } from '@mui/icons-material';
import { Button, Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
import { createUrl } from '../../../../util/helper';
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		backgroundColor: 'white',
		borderRadius: theme.spacing(0.5),
		flexDirection: 'column',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		padding: theme.spacing(0.5)
	},
	img: {
		height: 60,
		aspectRatio: 1.6
	},
	infor: {
		marginLeft: theme.spacing(1),
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
	},
	notes: {
		display: 'flex',
		flexDirection: 'column'
	},
	noteContainer: {

	},
	note: {
		display: 'flex',
		flexDirection: 'row',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		alignItems: 'center',
		borderBottom: '1px solid gray'
	}
}))

const ErrorNote = (props) => {
	const classes = useStyles()
	const {defective} = props
	return (
		<div className= {classes.note}>
			<Error sx = {{color: 'purple'}}/>
			<Typography variant = 'subtitle1' sx = {{ml: theme.spacing(1)}}>
				{defective}
			</Typography>
		</div>
	)
}

const ValidateQuestionItem = (props) => {
	const classes = useStyles()
	const {question} = props
	const {title, image, defectives} = question
	const handleClick = () => {
		if (props.onClick) {
			props.onClick()
		}
	}
	return (
		<div className = {classes.container} >
			<div className= {classes.header}>
				<img src = {createUrl(image)}
					className= {classes.img}/>
				<div className = {classes.infor}>
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
			<div className = {classes.notes}>
				{
					defectives.map((item, index) => (
						<div className= {classes.noteContainer}   key = {''+index}>
							<ErrorNote defective = {item}/>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default ValidateQuestionItem