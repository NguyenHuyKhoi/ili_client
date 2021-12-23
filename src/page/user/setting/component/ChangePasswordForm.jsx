import { Alert, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/auth/context'
import { theme } from '../../../../theme'
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
	const {dispatch, user} = useContext(AuthContext)
	const [inputs, setInputs] = useState({old: "", neww: "", repeat: ""})
    const [alert, setAlert] = useState({})
    const {old, neww, repeat} = inputs

  	const handleSubmit = (e) => {
		e.preventDefault() 
		// if (!validatePassword(old)) {
		// 	setAlert({
		// 		type: 'error',
		// 		msg:"Old password is empty or invalid"
		// 	})
		// 	return
		// }
		// if (!validatePassword(neww)) {
		// 	setAlert({
		// 		type: 'error',
		// 		msg:"New password is empty or invalid"
		// 	})
		// 	return
		// }
		// if (!validatePassword(repeat)) {
		// 	setAlert({
		// 		type: 'error',
		// 		msg:"Repeat password is empty or invalid"
		// 	})
		// 	return
		// }

		if (neww != repeat) {
			setAlert({
				type: 'error',
				msg: 'new and repeat password not same'
			})
			return
		}
		if (neww == old) {
			setAlert({
				type: 'error',
				msg: 'new and old password are same'
			})
			return
		}

		axios.post('auth/change-password', {
			token: user.accessToken,
			oldPassword: old,
			newPassword: neww
		})
		.then (() => {
			setAlert({
				type: 'success',
				msg: 'Change password successfully'
			})
		})
		.catch ((err) => {
			setAlert({
				type: 'error',
				msg: 'Something is wrong: ' + err.response.data.error
			})
		})
  }

	const handleChange = (key, value) => {
		setAlert({})
		setInputs({
			...inputs,
			[key]: value
		})
	}
  	return (
    	<div className = {classes.container}>
			<Snackbar open={alert.type != undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
			<Typography variant = 'subtitle1'>
				Change password
			</Typography>
			<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{my: theme.spacing(2)}} >
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="Old Password" variant="outlined" sx = {{width: '100%'}} 
						value={old}
						onChange = {(e) => handleChange('old', e.target.value)}
					/>
				</Grid>
				<Grid item xs = {6} >
					<div/>
				</Grid>
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="New Password" variant="outlined" sx = {{width: '100%'}}
						value={neww}
						onChange = {(e) => handleChange('neww', e.target.value)}
					/>
				</Grid>
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="Repeat New Password" variant="outlined" sx = {{width: '100%'}}
						value={repeat}
						onChange = {(e) => handleChange('repeat', e.target.value)}
					/>
				</Grid>

			</Grid>
			<Button variant = 'contained' 
				onClick = {handleSubmit}>
				Save
			</Button>
		</div>
  );
}

export default ChangePasswordForm