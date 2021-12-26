import { Add } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: theme.spacing(3),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		justifyContent: 'space-between'
	}
}))

export const InforRowItem = (props) => {
	const classes = useStyles()
	const {value, label} = props
	return (
		<div className = {classes.container}>
			<Typography variant = 'subtitle1' sx = {{flex: 1}}>
				{label}
			</Typography>
			{/* <Add sx = {{mx: theme.spacing(1)}}/> */}
			<Typography variant = 'subtitle1'>
				{value}
			</Typography>
		</div>
	)
}

export default InforRowItem