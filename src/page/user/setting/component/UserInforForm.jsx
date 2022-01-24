import { Alert, Grid, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../../../component/Button'
import MediaUploadCard from '../../../../component/MediaUploadCard'
import TextField from '../../../../component/TextField'
import { updateUserInfor } from '../../../../context/auth/actions'
import { AuthContext } from '../../../../context/auth/context'
import { UserContext } from '../../../../context/user/context'
import FirebaseHelper, { IMAGE_CATEGORIES } from '../../../../firebase'
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
		backgroundColor: theme.palette.secondary.main,
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
		alignItems: 'center'
    },
	avatar: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: theme.spacing(2)
	},
	inputs: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	}
}))

const UserInforForm = (props) => {
	const classes = useStyles()
	const {user, token} = useContext(AuthContext)
	const authDispatch = useContext(AuthContext).dispatch
	const {dispatch} = useContext(UserContext)

	const [inputs, setInputs] = useState({...user})
    const [alert, setAlert] = useState({})
	const {username, banner, avatar, email} = inputs

	useEffect(() => {
		setInputs({...user})
		return () => {
		}
	}, [user])

	const handleSubmit = async (e) => {
		e.preventDefault() 

		//Upload image : banner, avatar
		var {banner, avatar} = inputs 
		var bannerUrl =  await FirebaseHelper.uploadImage(banner, IMAGE_CATEGORIES.PROFILE_BANNER) 
		var avatarUrl = await FirebaseHelper.uploadImage(avatar, IMAGE_CATEGORIES.PROFILE_AVATAR) 
	
		axios.put('user/'+ user._id, {
			...inputs,
			banner: bannerUrl,
			avatar: avatarUrl
		}, {
            headers: {
                'x-access-token': token
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
			<Typography variant = 'bigLabel' sx = {{color: '#000'}}>
				Profile
			</Typography>
			<MediaUploadCard 
				onSelectImage = {file => handleChange('banner', file)}
				onRemoveImage = {() => handleChange('banner', null)}
				style = {{height: theme.spacing(20), aspectRatio: 1.6, marginTop: theme.spacing(2)}}
				label = 'Upload a banner'
				image = {banner}/>
			<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{my: theme.spacing(1)}} >
				<Grid item xs = {5} sx = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<MediaUploadCard 
						onSelectImage = {file => handleChange('avatar', file)}
						onRemoveImage = {() => handleChange('avatar', null)}
						labelVariant = {'btnLabel'}
						style = {{height: theme.spacing(22), width: theme.spacing(22), alignSelf: 'center'}}
						label = 'Upload an avatar'
						image = {avatar}/>
				</Grid>
				<Grid item xs = {7} sx = {{display: 'flex'}}>
					<div className = {classes.inputs}>
						<TextField 
							placeholder="User name..." 
							style = {{width: '100%'}} 
							value={username}
							onChange = {(value) => handleChange('username', value)}
						/>
						<TextField 
							style = {{width: '100%', marginTop: theme.spacing(2)}} 
							value={email}
							disabled
							onChange = {(value) => handleChange('email', value)}
						/>
					</div>
				</Grid>

			</Grid>
			<Button 
				variant = 'success' 
				size = 'small'
				onClick = {handleSubmit}
				label = 'Save'
				style = {{width: theme.spacing(20), marginTop: theme.spacing(3)}}/>
		</div>
  );
}

export default UserInforForm