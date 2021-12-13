import { Add, ChevronLeft, ChevronRight, Close, PersonOutline } from '@mui/icons-material';
import { Divider, Grid, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from "../../../../theme";
import InforRowItem from './InforRowItem';
import PlayerDetailTable from './PlayerDetailTable';
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
	header: {
		display: 'flex',
		flexDirection: 'row'
	},
	body: {
		flex: 1,
		overflow: 'auto',
	},
	leftHeader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems:'center',
		padding: theme.spacing(3)
	},
	pieChart: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		backgroundColor: 'red',
		borderRadius: theme.spacing(5)
	},
	inforItem: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		alignItems: 'center'
	},
	table: {
		padding: theme.spacing(3),
		marginTop: theme.spacing(5)
	}
}))


const ColInforItem = () => {
	const classes = useStyles()
	return (
		<div className = {classes.inforItem}>
			<Typography variant = 'h4' sx = {{fontWeight: 'bold'}}>
				0%
			</Typography>
			<Typography variant = 'subtitle1'>
				Correct
			</Typography>
		</div>
	)
}

const Header = () => {
	const classes = useStyles() 
	return (
		<div className = {classes.header}>
			<Grid container >
				<Grid item xs = {5} >
					<div className = {classes.leftHeader}>
						<div className = {classes.pieChart}/>
						<ColInforItem/>
						<ColInforItem/>
					</div>
				</Grid>
				<Grid item xs = {7}>
					<Grid container >
						{
							Array.from(Array(5)).map((_, index) => (
								<Grid item xs = {6}>
									<InforRowItem />
									<Divider/>
								</Grid>
							))
						}
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}
const PlayerDetailModal = (props) => {
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
					<Header/>
					<div className = {classes.table}>
						<PlayerDetailTable/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PlayerDetailModal