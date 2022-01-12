import { Error } from '@mui/icons-material';
import { Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Button from '../../../../component/Button';
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
			<Error sx = {{color: theme.palette.error.main}}/>
			<Typography variant = 'label' sx = {{ml: theme.spacing(1), color: '#000'}}>
				{defective}
			</Typography>
		</div>
	)
}

const ValidateQuestionItem = (props) => {
	const classes = useStyles()
	const {question, index} = props
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
				<Typography variant = 'btnLabel' sx = {{color: '#000',alignSelf: 'center', flex: 1, marginLeft: theme.spacing(1), marginRight: theme.spacing(2)}}>
					{
						(index + 1) + '. '+ 
						(
							title == null || title == '' ?
							'Untitled'
							:
							title
						)
					}
				</Typography>
				<Button 	
					size = 'small'
					variant = 'primary' onClick = {handleClick}
					style = {{alignSelf: 'center'}}
					label = 'Fix'/>
				
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