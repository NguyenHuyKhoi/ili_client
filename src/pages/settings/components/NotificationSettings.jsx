import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Grid, Switch, TextField, Typography } from '@mui/material'
import {theme} from '../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: theme.spacing(2),
		borderRadius: theme.spacing(0.5),
		backgroundColor: 'white',
    },
	item: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		padding: theme.spacing(0.5),
		borderBottom: '1px solid gray'
	}
}))
const Item = (props) => {
	const classes = useStyles()
	return (
		<div className = {classes.item}>
			<Typography variant = 'subtitle1' sx = {{flex: 1}}>
				Shares a kahoot with me
			</Typography>
			<Switch/>
		</div>
	)
}
const NotificationSettings = (props) => {
  const classes = useStyles()
  return (
    	<div className = {classes.container}>
			<Typography variant = 'subtitle1'>
				Notifications
			</Typography>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			
		</div>
  );
}

export default NotificationSettings