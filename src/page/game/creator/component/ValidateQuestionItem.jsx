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
		height: 70,
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
		padding: theme.spacing(1),
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5),
		alignItems: 'center',
		borderBottom: '1px solid #f2f2f2'
	}
}))

const ErrorNote = (props) => {
	const classes = useStyles()
	const {defective} = props
	return (
		<div className= {classes.note}>
			<Error sx = {{color: '#46178F'}}/>
			<Typography variant = 'subtitle2' sx = {{ml: theme.spacing(1), color: '#5F5F5F'}}>
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
					<Typography variant = 'subtitle2' sx = {{color: '#5F5F5F'}}>
						1 - Quiz
					</Typography> 
					<Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}}>
						{
							title == null || title == '' ?
							'Untitled'
							:
							title
						}
					</Typography>
				</div>
				<div >
					<Button 	
						size = 'small'
						variant = 'contained' onClick = {handleClick}
						sx = {{color: 'white', fontWeight: 'bold', textTransform: 'none'}}>
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