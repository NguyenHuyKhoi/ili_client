import React, {useContext, useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles'
import { Alert, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'
import {theme} from '../../../../theme'
import { AuthContext } from '../../../../context/auth/context'
import { validatePassword } from '../../../../util/validator'
import { changePassword } from '../../../../context/auth/apiCalls'
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
	const {dispatch, message, isSuccess, isLoading, user} = useContext(AuthContext)
	const [inputs, setInputs] = useState({oldPassword: "", newPassword: "", repeatNewPassword: ""})
	const [msg, setMsg] = useState("")
	const [showAlert, setShowAlert] = useState(false)
  
	useEffect(() => {
		handleMsg(message)
		return () => {
			
		}
	}, [message, isSuccess])

  const handleMsg = (msg) => {
	  setMsg(msg)
	  setShowAlert(msg != '')
  }

  const {oldPassword, newPassword, repeatNewPassword} = inputs

  const handleSubmit = (e) => {
		e.preventDefault() 
		// if (!validatePassword(oldPassword)) {
		// 	handleMsg("Old password is empty or invalid")
		// 	return
		// }
		// if (!validatePassword(newPassword)) {
		// 	handleMsg("New password is empty or invalid")
		// 	return
		// }
		// if (!validatePassword(repeatNewPassword)) {
		// 	handleMsg("Repeat new password is empty or invalid")
		// 	return
		// }
		if (newPassword != repeatNewPassword) {
			handleMsg("New and repeat are not same")
			return
		}
		if (newPassword == oldPassword) {
			handleMsg("New and old are same")
			return
		}

		changePassword ({
			oldPassword,
			newPassword
		}, user.accessToken, dispatch)
  }

	const handleChange = (key, value) => {
			handleMsg("")
			setInputs({
				...inputs,
				[key]: value
			})
	}
	console.log("Is success: ", isSuccess)
  	return (
    	<div className = {classes.container}>
			<Snackbar open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setShowAlert(false)} severity={isSuccess ? 'success': 'error'} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
			<Typography variant = 'subtitle1'>
				Change password
			</Typography>
			<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{my: theme.spacing(2)}} >
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="Old Password" variant="outlined" sx = {{width: '100%'}} 
						value={oldPassword}
						onChange = {(e) => handleChange('oldPassword', e.target.value)}
					/>
				</Grid>
				<Grid item xs = {6} >
					<div/>
				</Grid>
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="New Password" variant="outlined" sx = {{width: '100%'}}
						value={newPassword}
						onChange = {(e) => handleChange('newPassword', e.target.value)}
					/>
				</Grid>
				<Grid item xs = {6} >
					<TextField id="outlined-basic" label="Repeat New Password" variant="outlined" sx = {{width: '100%'}}
						value={repeatNewPassword}
						onChange = {(e) => handleChange('repeatNewPassword', e.target.value)}
					/>
				</Grid>

			</Grid>
			<Button variant = 'contained' 
				onClick = {handleSubmit}
				disabled = {isLoading}>
				Save
			</Button>
		</div>
  );
}

export default ChangePasswordForm