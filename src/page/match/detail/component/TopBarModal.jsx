import { ChevronLeft, ChevronRight, Close, PersonOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	left:{
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	right: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
}))

const TopBarModal = (props) => {
	const classes = useStyles()
	const {title, index, total} = props 
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}

	const handleLeft = () => {
		if (index == 1) return 
		if (props.onLeft) props.onLeft()
	}

	const handleRight = () => {
		if (index == total) return 
		if (props.onRight) props.onRight()
	}
	return (
		<div className = {classes.container}>
			<div className = {classes.left}>
				<PersonOutline/>
				<Typography variant = 'subtitle1'>
					{title}
				</Typography>
			</div>
			<div className = {classes.right}>
				<Typography variant = 'subtitle1'>
					{`${index}/${total}`}
				</Typography>
				<ChevronLeft 
					sx = {{
						color: index == 1 ? 'gray' : 'black'
					}}
					onClick = {handleLeft}
				/>
				<ChevronRight
					sx = {{
						color: index == total ? 'gray' : 'black'
					}}
					onClick = {handleRight}
				/>
				<Close onClick = {handleClose}/>
			</div>
		</div>
	)
}

export default TopBarModal