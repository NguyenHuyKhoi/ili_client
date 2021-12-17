import { Add, ChevronLeft, ChevronRight, Close, Square } from '@mui/icons-material';
import { Divider, Grid, Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
import InforRowItem from './InforRowItem';
import PlayerDetailTable from './PlayerDetailTable';
import QuestionDetailCard from './QuestionDetailCard';
import TopBarModal from './TopBarModal';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '80vw',
		maxHeight: '80vh',
		backgroundColor: 'white',
		border: '2px solid #000',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',

    },
	body: {
		flex: 1,
		overflow: 'auto',
	},
	table: {
		padding: theme.spacing(3)
	},
	infors: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing(1)
	},
}))

const QuestionDetailModal = (props) => {
	const classes = useStyles()
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
			onBackdropClick = {handleClose}
			> 
			<div className={classes.container}>
				<TopBarModal onClose = {handleClose}/>
				<Divider/>
				<div className = {classes.body}>
					<QuestionDetailCard/>
					<div className = {classes.infors}>
						<Grid container rowSpacing = {3}>
							{
								Array.from(Array(3)).map((_, index) => (
									<Grid item xs = {4}   key = {''+index}>
										<InforRowItem/>
									</Grid>
								))
							}
						</Grid>
					</div>
					<div className = {classes.table}>
						<PlayerDetailTable/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default QuestionDetailModal