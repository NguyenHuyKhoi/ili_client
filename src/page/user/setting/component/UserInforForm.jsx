import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Grid, TextField, Typography } from '@mui/material'
import {theme} from '../../../../theme'
import MediaUploadCard from '../../../../component/MediaUploadCard'
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
	const [user, setUser] = useState({})
	const handleChange = (key, value) => {
		setUser({
			...user,
			[key]: value
		})
	}

	const {avatar, username, name, email, banner} = user
  	return (
    	<div className = {classes.container}>
			<Typography variant = 'subtitle1'>
				User Information
			</Typography>
			<MediaUploadCard 
				onSelectImage = {file => handleChange('banner', file)}
				onRemoveImage = {() => handleChange('banner', null)}
				src = {banner != null || banner != undefined ? URL.createObjectURL(banner) : null}/>
			<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{my: theme.spacing(2)}} >
				<Grid item xs = {5} >
					<MediaUploadCard 
						onSelectImage = {file => handleChange('avatar', file)}
						onRemoveImage = {() => handleChange('avatar', null)}
						src = {avatar != null || avatar != undefined ? URL.createObjectURL(avatar) : null}/>
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
			<Button variant = 'contained' >
				Save
			</Button>
		</div>
  );
}

export default UserInforForm