import { Add } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Icon from '../../../../component/Icon';
import { theme } from "../../../../theme";
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: theme.spacing(1),
		paddingTop: theme.spacing(1.2),
		paddingBottom: theme.spacing(1.2),
		borderBottom: '1px solid #b2b2b2',
		justifyContent: 'space-between'
	}
}))

export const InforRowItem = (props) => {
	const classes = useStyles()
	const {value, label, icon, color} = props
	return (
		<div className = {classes.container}>
			<Typography variant = 'subtitle2' sx = {{flex: 1, color: '#5f5f5f'}}>
				{label}
			</Typography>
			<Icon name = {icon} style = {{color: color}}/>
			<Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333', width: theme.spacing(8), textAlign: 'center'}}>
				{value}
			</Typography>
		</div>
	)
}

export default InforRowItem