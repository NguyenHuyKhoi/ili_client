import { Alert, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MediaUploadCard from '../../../../component/MediaUploadCard'
import { updateUserInfor } from '../../../../context/auth/actions'
import { AuthContext } from '../../../../context/auth/context'
import { UserContext } from '../../../../context/user/context'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'
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
	const {dispatch} = useContext(UserContext)

	const [inputs, setInputs] = useState({...user})
    const [alert, setAlert] = useState({})
	const {username, name, banner, avatar, email} = inputs

	useEffect(() => {
		setInputs({...user})
		return () => {
		}
	}, [user])

	const handleSubmit = (e) => {
		e.preventDefault() 
		axios.put('user/'+ user._id, inputs, {
            headers: {
                'x-access-token': user.accessToken
            }
        })    
		.then((res) => {
			setAlert({
				type: 'success',
				msg: 'Update  successfully'
			})
			authDispatch(updateUserInfor(res.data))
		})
		.catch ((err) => {
			setAlert({
				type: 'error',
				msg: 'Something is wrong'
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
				onClick = {handleSubmit}>
				Save
			</Button>
		</div>
  );
}

export default UserInforForm