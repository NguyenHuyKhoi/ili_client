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

export const InforRowItem = () => {
	const classes = useStyles()
	return (
		<div className = {classes.container}>
			<Typography variant = 'subtitle1' sx = {{flex: 1}}>
				Rank
			</Typography>
			<Add sx = {{mx: theme.spacing(1)}}/>
			<Typography variant = 'subtitle1'>
				0 of 7
			</Typography>
		</div>
	)
}

export default InforRowItem