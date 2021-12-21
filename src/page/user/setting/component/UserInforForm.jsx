import React, {useContext, useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles'
import { Alert, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'
import {theme} from '../../../../theme'
import MediaUploadCard from '../../../../component/MediaUploadCard'
import {AuthContext} from '../../../../context/auth/context'
import { createUrl } from '../../../../util/helper'
import { profileEditAPI } from '../../../../context/user/apiCalls'
import { UserContext } from '../../../../context/user/context'
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
	const {user} = useContext(AuthContext)
	const authDispatch = useContext(AuthContext).dispatch
	const {dispatch, message, isSuccess, isLoading} = useContext(UserContext)
	const [inputs, setInputs] = useState({username: "", name: "", banner: "", avatar: "", email: ""})
	const [msg, setMsg] = useState("")
	const [showAlert, setShowAlert] = useState(false)
  
	useEffect(() => {
		handleMsg(message)
		setInputs({
			banner: user.banner,
			avatar: user.avatar,
			email: user.email,
			username: user.username,
			name: user.name
		})
		//console.log("Update inputs from user ",user)
		return () => {
			
		}
	}, [message, isSuccess, user])

	const handleMsg = (msg) => {
		setMsg(msg)
		setShowAlert(msg != '')
	}

	const {username, name, banner, avatar, email} = inputs

	const handleSubmit = (e) => {
			e.preventDefault() 
			profileEditAPI(
				inputs,
				user,
				dispatch,
				authDispatch
			)
	}

	const handleChange = (key, value) => {
			handleMsg("")
			setInputs({
				...inputs,
				[key]: value
			})
	}

  	return (
    	<div className = {classes.container}>
			<Snackbar open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setShowAlert(false)} severity={isSuccess ? 'success': 'error'} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
			<Typography variant = 'subtitle1'>
				User Information
			</Typography>
			<MediaUploadCard 
				onSelectImage = {file => handleChange('banner', file)}
				onRemoveImage = {() => handleChange('banner', null)}
				src = {createUrl(banner)}/>
			<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{my: theme.spacing(2)}} >
				<Grid item xs = {5} >
					<MediaUploadCard 
						onSelectImage = {file => handleChange('avatar', file)}
						onRemoveImage = {() => handleChange('avatar', null)}
						src = {createUrl(avatar)}/>
				</Grid>
				<Grid item xs = {7} >
					<div className = {classes.inputs}>
						<div className = {classes.inputContainer}>
							<TextField id="outlined-basic" label="User name" variant="outlined" sx = {{width: '100%'}}
								value = {username}
								onChange={e => handleChange('username', e.target.value)}/>
						</div>
						<div className = {classes.inputContainer}>
							<TextField id="outlined-basic" label="Name" variant="outlined" sx = {{width: '100%'}}
								value = {name}
								onChange={e => handleChange('name', e.target.value)}/>
						</div>
						<div className = {classes.inputContainer}>
							<TextField id="outlined-basic" label="Email" variant="outlined" sx = {{width: '100%'}}
								disabled = {true}
								value = {email}/>
						</div>
					</div>
				</Grid>

			</Grid>
			<Button variant = 'contained' 
				onClick = {handleSubmit} 
				disabled = {isLoading} >
				Save
			</Button>
		</div>
  );
}

export default UserInforForm