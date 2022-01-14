import { TextareaAutosize } from '@mui/base';
import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import facebook_icon from '../../../../asset/image/facebook_icon.png';
import youtube_icon from '../../../../asset/image/youtube_icon.png';
import WrappedRadioGroup from '../../../../component/WrappedRadioGroup';
import { theme } from "../../../../theme";
import YoutubeHelper from '../../../../util/platform/youtube';
import FacebookHelper from '../../../../util/platform/facebook';
import AccountCard from './AccountCard';


/* global gapi */
/* global FB */

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
export const STREAM_ACCOUNT_TYPES_ID = {
	YOUTUBE_BROAD_CAST: 0,
	FB_LIVESTREAM_PROFILE: 1,
	FB_LIVESTREAM_GROUP: 2,
	FB_LIVESTREAM_PAGE: 3
}

const STREAM_ACCOUNT_TYPES = [
	{
		logo: youtube_icon,
		title: 'Youtube broadcast',
		id: STREAM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST

	},
	{
		logo: facebook_icon,
		title: 'Fb livestream profile',
		id: STREAM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE
	}
]

const SettingModal = (props) => {
	const classes = useStyles()
	const {setting} = props
	const [draftSetting, setDraftSetting] = useState( ...JSON.parse(JSON.stringify(setting)))
	const {title, description, account, lobbyTime} = draftSetting
	
	var {open} = props
	if (open == undefined) open = false

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
	 
	const activeYT = () => {
		YoutubeHelper.auth()
			.then(() => {
				console.log("Auth YT success")
				handleChange('account', {
					accountType: STREAM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST
				})
			})
			.catch((err) => {
				console.log("Youtube auth error")
			})
	}

	const activeFBProfile = () => {
		FacebookHelper.auth()
			.then((res) => {
				let account = {
					...res,
					accountType: STREAM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE
				}
				handleChange('account', account)
				console.log("Auth Fb success: ", account)
			})
			.catch((err) => {
				console.log("FB Auth error: ", err.error)
			})
	}

	const selectAccountType = (type) => {
		if (account != undefined && account.accountType == type.id) {
			handleChange('account', undefined)
		}
		else {
			// select account type
			switch (type.id) {
				case STREAM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST:
					activeYT()
					break
				case STREAM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE:
					activeFBProfile()
					break
			}
		}
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onBackdropClick = {handleClose}>
			<div className={classes.container}>
				<Typography variant = 'h5' sx = {{fontWeight: 'bold', color: '#333333'}}>
					Ili Summary
				</Typography>


				<Grid container columnSpacing = {5} rowSpacing = {2} 
					sx = {{mt: theme.spacing(4)}}>
					<Grid item xs = {12}>
						<div className = {classes.leftCol}>
							<Typography variant = 'subtitle2' 
								sx= {{fontWeight: 'bold', color: '#333333'}} >
								Select account to go live(*)
							</Typography>	
							<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{mt: theme.spacing(1)}}>
								{
									STREAM_ACCOUNT_TYPES.map((type, index) => (
										<Grid item xs = {4} key = {'' + index}>
											<AccountCard 
												accountType = {type}
												onSelect = {() => selectAccountType(type)}
												isSelected = {
													account != undefined &&
													account.accountType === type.id
												}/>
										</Grid>
									))
								}
							</Grid>
							<Typography variant = 'subtitle2' 
								sx= {{fontWeight: 'bold', color: '#333333', my: theme.spacing(1)}} >
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
							<Typography variant = 'subtitle2' 
								sx = {{ mt: theme.spacing(2), fontWeight: 'bold', color: '#333333', mb: theme.spacing(1)}}>
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
					<Button variant="contained" color="neutral"
						sx = {{color: '#333333', fontWeight: 'bold', textTransform: 'none'}}
						onClick = {handleCancel}>
						Cancel
					</Button>
					<Button variant="contained" color="success" 
						sx = {{ml: theme.spacing(2),color: 'white', fontWeight: 'bold', textTransform: 'none'}}
						onClick = {handleDone}>
						Done
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default SettingModal