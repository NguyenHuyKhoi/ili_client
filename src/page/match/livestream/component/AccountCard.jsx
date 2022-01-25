import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from '../../../../theme';

const useStyles = makeStyles((theme) => ({
    container: {
		display: 'flex',
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		padding: theme.spacing(1),
		borderRadius: theme.spacing(1),
		'&:hover': {
			cursor: 'pointer'
		}
    },
	logo: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
	infor: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: theme.spacing(1),
		justifyContent: 'center'
	},
	activeDiv: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	activeDot: {
		width: theme.spacing(1),
		height: theme.spacing(1),
		borderRadius: theme.spacing(0.5)
	}
}))

const STATES = [
	{
		color: theme.palette.error.main,
		label: 'Not active',
	},
	{
		color: theme.palette.primary.main,
		label: 'Active',
	},
	{
		color: theme.palette.success.main,
		label: 'Selected',
	},
]


const AccountCard = (props) => {
	const classes = useStyles()
	const {account, select} = props 
	const {title, logo} = account

	// const state = ! active ? STATES[0]
	// 		: ! select ? STATES[1]
	// 		: STATES[2]

	const state = ! select ? STATES[0]
			: STATES[1]
	return (
		<div className={classes.container} 
			style = {{
				border:`2px solid ${state.color} `
			}}
			onClick = {() => {
				if (props.onSelect) props.onSelect()
			}}>
			<img src = {logo} className= {classes.logo} alt = 'Logo'/>
			<div className = {classes.infor} >
				<Typography variant = 'btnLabel' sx = {{color: '#000'}}>
					{title}
				</Typography>
				<div className = {classes.activeDiv}>
					<div className = {classes.activeDot} style = {{backgroundColor: state.color}}/>
					<Typography variant = 'caption' sx = {{ml: theme.spacing(1)}}>
						{
							state.label
						}
					</Typography>
				</div>

			</div>
		</div>
	);
}

export default AccountCard