import { TextareaAutosize } from '@mui/base';
import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import WrappedRadioGroup from '../../../../component/WrappedRadioGroup';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import { theme } from "../../../../theme";
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50vw',
		maxHeight: '80vh',
		backgroundColor: 'white',
		border: '2px solid #000',
		padding: theme.spacing(2),
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
		marginTop: theme.spacing(3)
	},
	uploadImg: {
		width: '100%',
		height:200
	}
}))

const CollectionCreateModal = (props) => {
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



	const handleChange = (key, value) => {
		setDraftSetting({
			...draftSetting,
			[key]: value
		})
	}
	const {title, image, description, language, visibility} = draftSetting
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onBackdropClick = {handleClose}>
			<div className={classes.container}>
				<Typography variant = 'h5' sx = {{fontWeight: 'bold', color: 'black'}}>
					Kahoot Summary
				</Typography>
				<Grid container columnSpacing = {5} rowSpacing = {2} 
					sx = {{mt: theme.spacing(2)}}>
					<Grid item xs = {7}>
						<div className = {classes.leftCol}>
							<Typography variant = 'subtitle1' 
								sx= {{fontWeight: 'bold'}} >
								Title
							</Typography>
							<TextField id="outlined-basic" label="" value = {title} variant="outlined"
								onChange = {(e) => handleChange('title', e.target.value)} />
							<Typography variant = 'subtitle1' 
								sx = {{ mt: theme.spacing(2), fontWeight: 'bold'}}>
								Description(optional)
							</Typography>
							<TextareaAutosize
								aria-label="empty textarea"
								value = {description}
								onChange={(e) => handleChange('description', e.target.value)}
								placeholder="Describe your game..."
								style={{ width: '100%', height: 120,m: theme.spacing(0.5) }}
							/>
							<WrappedRadioGroup title = 'Owner' 
								list = {[
									{label: 'Personal', value: 'personal'}
								]}
								value = {'personal'}
								/>

							<WrappedRadioGroup title = 'Visibility' 
								list = {[
									{label: 'Public', value: 'public'},
									{label: 'Private', value: 'private'}
								]}
								value = {'public'}
								/>
						</div>
					</Grid>
					<Grid item xs = {5}>
						<div className = {classes.rightCol}>
							<Typography variant = 'subtitle1' 
								sx= {{fontWeight: 'bold'}} >
								Cover image
							</Typography>
							<div className = {classes.uploadImg}>
								<MediaUploadCard 
									onSelectImage = {file => handleChange('image', file)}
									onRemoveImage = {() => handleChange('image', null)}
									src = {image != null || image != undefined ? URL.createObjectURL(image) : null}/>
							</div>
						</div>
					</Grid>
				</Grid>
				<div className = {classes.footer}>
					<Button variant="contained" color="neutral"
						onClick = {handleClose}>
						Cancel
					</Button>
					<Button variant="contained" color="success" sx = {{ml: theme.spacing(2)}}
						onClick = {() => {
							if (props.onDone) props.onDone(draftSetting)
						}}>
						Create
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default CollectionCreateModal