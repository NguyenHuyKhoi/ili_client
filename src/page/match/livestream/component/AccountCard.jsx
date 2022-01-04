import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from '../../../../theme';

const useStyles = makeStyles((theme) => ({
    container: {
		display: 'flex',
		flexDirection: 'row',
		padding: theme.spacing(1),
		border: '1px solid #392575',
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
		borderRadius: theme.spacing(0.5),
		backgroundColor: '#81CF0C'
	}
}))

const AccountCard = (props) => {
	const classes = useStyles()
	const {accountType, isSelected} = props 
	const {title, logo} = accountType
	console.log("Account Type: ", accountType, isSelected)
	return (
		<div className={classes.container} 
			style = {{
				border: isSelected ? '2px solid #81CF0C'  : '2px solid gray'
			}}
			onClick = {() => {
				if (props.onSelect) props.onSelect()
			}}>
			<img src = {logo} className= {classes.logo}/>
			<div className = {classes.infor} >
				<Typography variant = 'subtitle1' sx = {{fontWeight: 'bold'}}>
					{title}
				</Typography>
				{
					isSelected &&
					<div className = {classes.activeDiv}>
						<div className = {classes.activeDot}/>
						<Typography variant = 'captiion' sx = {{ml: theme.spacing(1)}}>
							Actived
						</Typography>
					</div>
				
				}

			</div>
		</div>
	);
}

export default AccountCard