import { TextareaAutosize } from '@mui/base';
import { FormControlLabel, Grid, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect} from 'react';
import DropdownSelect from '../../../../component/DropdownSelect';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import WrappedRadioGroup from '../../../../component/WrappedRadioGroup';
import { theme } from "../../../../theme";
import { createUrl } from '../../../../util/helper';
import TextField from '../../../../component/TextField'
import TextArea from '../../../../component/TextArea';
import Button from '../../../../component/Button';
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
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 5px 225px 5px/5px 225px 5px 255px',

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
		marginTop: theme.spacing(3)
	},
	uploadImg: {
		width: '100%',
		height:200,
		borderRadius: theme.spacing(1),
		border: '2px solid #f2f2f2'
	}
}))

const SettingModal = (props) => {
	const classes = useStyles()
	const {setting} = props
	const [draftSetting, setDraftSetting] = useState({...setting})

	var {open} = props
	if (open == undefined) open = false

	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}
	const handleDone = () => {
		console.log("Handle done modal")
		if (props.onDone) {
			props.onDone(draftSetting)
		}
	}

	const handleCancel = () => {
		setDraftSetting({...setting})
		handleClose()
	}

	const handleChange = (key, value) => {
		setDraftSetting({
			...draftSetting,
			[key]: value
		})
	}
	const {title, cover, description, visibility} = draftSetting
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
					sx = {{mt: theme.spacing(2)}}>
					<Grid item xs = {7}>
						<div className = {classes.leftCol}>
							<TextField 	
								placeholder='Enter  title ...'	
								value = {title} 
								size='small'
								onChange = {(value) => handleChange('title',value)} />

							<TextArea
								value = {description}
								onChange={(value) => handleChange('description', value)}
								placeholder="Enter some description..."
								style={{ width: '100%', height: 120,marginTop: theme.spacing(3), resize: 'none' }}
							/>

							<WrappedRadioGroup title = 'Visibility' 
								list = {[
									{label: 'Public', value: 'public'},
									{label: 'Private', value: 'private'}
								]}
								sx = {{alignSelf: 'center'}}
								value = {visibility}
								onChange = {(value)=>handleChange('visibility',value)}
							/>
					
					
						</div>
					</Grid>
					<Grid item xs = {5}>
						<div className = {classes.rightCol}>
							<div className = {classes.uploadImg}>
								<MediaUploadCard 
									onSelectImage = {file => handleChange('cover', file)}
									onRemoveImage = {() => handleChange('cover', null)}
									label = 'Upload a cover'
									src = {createUrl(cover)}/>
							</div>
						</div>
					</Grid>
				</Grid>
				<div className = {classes.footer}>
					<Button 
						variant="warning"
						label = 'Cancel'
						style = {{width: theme.spacing(15)}}
						onClick = {handleCancel}/>

					<Button variant="success" 
						style = {{marginLeft: theme.spacing(5), width: theme.spacing(15)}}
						label = 'Done'
						onClick = {handleDone}/>
				</div>
			</div>
		</Modal>
	);
}

export default SettingModal