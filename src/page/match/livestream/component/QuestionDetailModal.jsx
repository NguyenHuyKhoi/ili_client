import { TextareaAutosize } from '@mui/base';
import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState , useContext} from 'react';
import facebook_icon from '../../../../asset/image/facebook_icon.png';
import youtube_icon from '../../../../asset/image/youtube_icon.png';
import { MatchLivestreamContext } from '../../../../context/match/livestream/context';
import { theme } from "../../../../theme";
import { PLATFORM_APP } from '../../../../util/platform';
import QuestionRowItem from '../../../game/detail/component/QuestionRowItem';
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
const STREAM_ACCOUNT_TYPES_ID = {
	YOUTUBE_BROAD_CAST: 0,
	FB_LIVESTREAM_PROPFILE: 1,
	FB_LIVESTREAM_GROUP: 2
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
		id: STREAM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROPFILE
	}
]

const QuestionDetailModal = (props) => {
	const classes = useStyles()
	const {dispatch, question} = useContext(MatchLivestreamContext)
	var {open} = props
	if (open == undefined) open = false

	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
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
					Question
				</Typography>
				{
					question != undefined && 
					<QuestionRowItem 
						disable = {true}
						question = {question} 
						index = {0}
						onSelect = {() => {}}
					/>
				}
			
				<div className = {classes.footer}>
					<Button variant="contained" color="success" 
						sx = {{ml: theme.spacing(2),color: 'white', fontWeight: 'bold', textTransform: 'none'}}
						onClick = {handleClose}>
						Close
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default QuestionDetailModal