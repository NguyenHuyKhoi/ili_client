
import { Grid, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Button from '../../../../component/Button';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import TextArea from '../../../../component/TextArea';
import TextField from '../../../../component/TextField';
import WrappedRadioGroup from '../../../../component/WrappedRadioGroup';
import { theme } from "../../../../theme";
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50vw',
		maxHeight: '80vh',
		backgroundColor: theme.palette.secondary.main,
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
		height:200
	}
}))

const CollectionCreateModal = (props) => {
	const classes = useStyles()
	const [collection, setCollection] = 
		useState({title: '', cover: 'https://vtv1.mediacdn.vn/thumb_w/650/2019/7/22/lion-king-1-1563155068176555217978-15637834089391350227836-crop-15637834158711662738000.jpeg', description: '', visibility: 'public'})
	const {title, cover, description, visibility} = collection

	var {open} = props
	if (open ===undefined) open = false

	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}

	const handleChange = (key, value) => {
		setCollection({
			...collection,
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
					New collection
				</Typography>
				<Grid container columnSpacing = {5} rowSpacing = {2} 
					sx = {{mt: theme.spacing(2)}}>
					<Grid item xs = {7}>
						<div className = {classes.leftCol}>
						
							<TextField
								placeholder='Enter  title ...'	
								value = {title}
								size = 'big'
								onChange = {(value) => handleChange('title', value)} />
							
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
								value = {visibility}
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
									image = {cover}/>
							</div>
						</div>
					</Grid>
				</Grid>
				<div className = {classes.footer}>
					<Button 
						variant="warning" 
						onClick = {handleClose}
						style = {{width: theme.spacing(16)}}
						label = 'Cancel'/>
					<Button 
						variant="success"
						style = {{marginLeft: theme.spacing(5), width: theme.spacing(16)}}
						onClick = {() => {
							if (props.onDone) props.onDone(collection)
						}}
						label = 'Create'/>
				</div>
			</div>
		</Modal>
	);
}

export default CollectionCreateModal