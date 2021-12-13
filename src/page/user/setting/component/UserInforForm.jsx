import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Grid, TextField, Typography } from '@mui/material'
import {theme} from '../../../../theme'
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
	avatar: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: theme.spacing(2)
	},
	inputs: {
		display: 'flex',
		flexDirection: 'column'
	},
	inputContainer: {
		padding: theme.spacing(1)
	}
}))

const UserInforForm = (props) => {
  const classes = useStyles()
  return (
    	<div className = {classes.container}>
			<Typography variant = 'subtitle1'>
				User Information
			</Typography>
			<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{my: theme.spacing(2)}} >
				<Grid item xs = {3} >
					<img src = 'https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg' 
						className = {classes.avatar}/>
				</Grid>
				<Grid item xs = {9} >
					<div className = {classes.inputs}>
						<div className = {classes.inputContainer}>
							<TextField id="outlined-basic" label="User name" variant="outlined" sx = {{width: '100%'}}/>
						</div>
						<div className = {classes.inputContainer}>
							<TextField id="outlined-basic" label="Name" variant="outlined" sx = {{width: '100%'}}/>
						</div>
						<div className = {classes.inputContainer}>
							<TextField id="outlined-basic" label="Email" variant="outlined" sx = {{width: '100%'}}/>
						</div>
					</div>
				</Grid>

			</Grid>
			<Button variant = 'contained' >
				Save
			</Button>
		</div>
  );
}

export default UserInforForm