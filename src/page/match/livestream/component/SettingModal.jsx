import { TextareaAutosize } from '@mui/base';
import { Grid, Modal, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import Button from '../../../../component/Button';
import { selectPlatform } from '../../../../context/platform/actions';
import { PlatformContext } from '../../../../context/platform/context';
import { getPlatformHelper } from '../../../../context/platform/helper';
import { theme } from "../../../../theme";
import AccountCard from './AccountCard';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50vw',
		maxHeight: '80vh',
		backgroundColor: 'white',
		borderRadius: theme.spacing(1),
		padding: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',

    },
	leftCol: {
		display: 'flex',
		flexDirection: 'column'
	},
	rightCol: {
		display: 'flex',
		flexDirection: 'column'
	},
	img: {
		width: '100%',
		aspectRatio: 1.6
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: theme.spacing(5)
	},
	uploadImg: {
		width: '100%',
		height: 200,
		border: '1px solid #f2f2f2',
		borderRadius: theme.spacing(1)
	}
}))


const SettingModal = (props) => {
	const classes = useStyles()
	const {setting} = props
	const [draftSetting, setDraftSetting] = useState(setting == null ? {} : setting)
	const {title, description} = draftSetting
	
	const {platforms, dispatch, platform} = useContext(PlatformContext)
	var platformHelper = null
	var {open} = props
	if (open === undefined) open = false

	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}
	const handleDone = () => {
		if (props.onDone) {
			props.onDone(draftSetting)
		}
	}

	const handleCancel = () => {
		setDraftSetting({...setting})
		handleClose()
	}

	const handleChange = (key, value) => {
		console.log("Set change: ", key ,value)
		setDraftSetting({
			...draftSetting,
			[key]: value
		})
	}


	const selectAccount = (account) => {
		platformHelper = getPlatformHelper(account)
		if (platformHelper == null) {
			return
		}
		// if (account.id != PLATFORM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST
		// 	&& account.active == true  ) {
		// 	dispatch(selectPlatform(account))
		// 	return
		// }

		platformHelper.auth(account.id)
			.then((auth) => {
				var res = JSON.parse(JSON.stringify({...account, ...auth, active: true}))
				console.log('Platform is active and select now:', res)
				dispatch(selectPlatform(res))
			})
			.catch((err) => {
				console.log("Err auth:", err)
			})
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onBackdropClick = {handleClose}>
			<div className={classes.container}>
				<Typography variant = 'header' sx = {{color: '#000', textAlign: 'center'}}>
					Setting
				</Typography>


				<Grid container columnSpacing = {5} rowSpacing = {2} sx = {{mt: theme.spacing(3)}}>
					<Grid item xs = {6}>
						<div className = {classes.leftCol}>
							<Typography variant = 'label' 
								sx= {{color: '#000'}} >
								Select account to go live(*)
							</Typography>	
							{
								platforms.map((account, index) => (
									<div key = {'' + index} style = {{marginTop: theme.spacing(2)}}>
										<AccountCard 
											account = {account}
											select = {platform && platform.id === account.id}
											onSelect = {() => selectAccount(account)}/>
									</div>
								))
							}
						</div>
					</Grid>
					<Grid item xs = {6}>
						<div className = {classes.rightCol} >
							<Typography variant = 'label' 
								sx= {{color: '#000'}} >
								Title(*)
							</Typography>	
							<TextField 
								placeholder='Enter game title ...'	
								id="outlined-basic" 
								label="" 
								size='small'
								value = {title ? title : ''} 
								variant="outlined"
								onChange = {(e) => handleChange('title', e.target.value)} />
							<Typography variant = 'label' 
								sx = {{ mt: theme.spacing(2),  color: '#000', mb: theme.spacing(1)}}>
								Description
							</Typography>
							<TextareaAutosize
								aria-label="empty textarea"
								value = {description ? description : ''}
								onChange={(e) => handleChange('description', e.target.value)}
								placeholder="Describe your game..."
								style={{ width: '100%', height: 150	,m: theme.spacing(0.5), resize: 'none' }}
							/>
						</div>
					</Grid>
				</Grid>
				<div className = {classes.footer}>
					<Button 
						variant="warning" 
						onClick = {handleCancel}
						style = {{width: theme.spacing(15)}}
						label = 'Cancel'
						size = 'small'/>

					<Button 
						variant="success"
						style = {{marginLeft: theme.spacing(5), width: theme.spacing(15)}}
						onClick = {handleDone}
						size = 'small'
						label = 'Done'/>
				</div>
			</div>
		</Modal>
	);
}

export default SettingModal