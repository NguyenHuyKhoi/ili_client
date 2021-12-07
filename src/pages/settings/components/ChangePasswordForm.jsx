import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Grid, TextField, Typography } from '@mui/material'
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
    }
}))

const ChangePasswordForm = (props) => {
  const classes = useStyles()
  return (
    	<div className = {classes.container}>
			<Typography variant = 'subtitle1'>
				Change password
			</Typography>
			<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{my: theme.spacing(2)}} >
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="Old Password" variant="outlined" sx = {{width: '100%'}} />
				</Grid>
				<Grid item xs = {6} >
					<div/>
				</Grid>
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="New Password" variant="outlined" sx = {{width: '100%'}}/>
				</Grid>
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="Repeat New Password" variant="outlined" sx = {{width: '100%'}}/>
				</Grid>

			</Grid>
			<Button variant = 'contained' >
				Save
			</Button>
		</div>
  );
}

export default ChangePasswordForm