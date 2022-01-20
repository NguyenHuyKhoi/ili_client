
import { FormControlLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect} from 'react';
import Button from '../../../../component/Button';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import TextArea from '../../../../component/TextArea';
import TextField from '../../../../component/TextField';
import WrappedRadioGroup from '../../../../component/WrappedRadioGroup';
import { theme } from "../../../../theme";
import DropdownSelect from '../../../../component/DropdownSelect'
import { GAME_SUBJECTS } from '../../../../context/game/creator/context';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50vw',
		maxHeight: '80vh',
		backgroundColor: theme.palette.secondary.main,
		borderRadius: theme.spacing(1),
		padding: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',

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
	const [draftSetting, setDraftSetting] = useState(JSON.parse(JSON.stringify(setting)))
	const {title, cover, description, visibility, subject} = draftSetting
	
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
		console.log("handle change:", key, value)
		setDraftSetting({
			...draftSetting,
			[key]: value
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
				<Typography variant = 'header' sx = {{color: '#000', alignSelf: 'center'}}>
					Setting
				</Typography>
				<Grid container columnSpacing = {5} rowSpacing = {2} 
					sx = {{mt: theme.spacing(4)}}>
					<Grid item xs = {7}>
						<div className = {classes.leftCol}>
							<TextField 
								style = {{textAlign: 'center'}}
								placeholder='Enter game title ...'	
								size='big'
								value = {title ? title : ''} 
								onChange = {(value) => handleChange('title', value)} />

							<TextArea
								value = {description ? description : ''}
								onChange={(value) => handleChange('description', value)}
								placeholder="Describe your game..."
								style={{ width: '100%', height: 150	,marginTop: theme.spacing(2), resize: 'none' }}
							/>
							<div style = {{width: '50%', marginTop: theme.spacing(3)}}>
								<DropdownSelect title = 'Subject'
									list = {GAME_SUBJECTS}
									value = {subject}
									onChange = {(value)=>handleChange('subject',value)}/>
							</div>
							
						</div>
					</Grid>
					<Grid item xs = {5}>
						<div className = {classes.rightCol}>
							<div className = {classes.uploadImg}>
								<MediaUploadCard 
									onSelectImage = {file => handleChange('cover', file)}
									onRemoveImage = {() => handleChange('cover', null)}
									label = 'Upload a cover'
									image = {cover}/>
							</div>
						
							<WrappedRadioGroup title = 'Visibility' 
								list = {[
									{label: 'Public', value: 'public'},
									{label: 'Private', value: 'private'}
								]}
								value = {visibility}
								onChange = {(value)=>handleChange('visibility',value)}
								/>
		
						</div>
					</Grid>
				</Grid>
				<div className = {classes.footer}>
					<Button 
						variant="warning" 
						style = {{width: theme.spacing(16)}}
						onClick = {handleCancel}
						label = 'Cancel'/>
					<Button 
						variant="success" 
						style = {{marginLeft: theme.spacing(5), width: theme.spacing(16)}}
						onClick = {handleDone}
						label = 'Done'/>
				</div>
			</div>
		</Modal>
	);
}

export default SettingModal