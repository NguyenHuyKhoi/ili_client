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
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}
	return (
		<div className = {classes.container}>
			<div className = {classes.left}>
				<PersonOutline/>
				<Typography variant = 'subtitle1'>
					UserName
				</Typography>
			</div>
			<div className = {classes.right}>
				<Typography variant = 'subtitle1'>
					1/4
				</Typography>
				<ChevronLeft/>
				<ChevronRight/>
				<Close onClick = {handleClose}/>
			</div>
		</div>
	)
}

export default TopBarModal