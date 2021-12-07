import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Divider, Grid, Modal, Typography } from '@mui/material';
import { Add, ChevronLeft, ChevronRight, Close, PersonOutline } from '@mui/icons-material';
import { theme } from "../../../../theme";
import PlayerDetailTable from './PlayerDetailTable';
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
	bar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	leftbar:{
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	rightbar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
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
	colInforItem: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		alignItems: 'center'
	},
	rowInforItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: theme.spacing(3),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		justifyContent: 'space-between'
	},
	tableContainer: {
		padding: theme.spacing(3),
		marginTop: theme.spacing(5)
	}
}))

const Topbar = () => {
	const classes = useStyles()
	return (
		<div className = {classes.bar}>
			<div className = {classes.leftbar}>
				<PersonOutline/>
				<Typography variant = 'subtitle1'>
					UserName
				</Typography>
			</div>
			<div className = {classes.rightbar}>
				<Typography variant = 'subtitle1'>
					1/4
				</Typography>
				<ChevronLeft/>
				<ChevronRight/>
				<Close/>
			</div>
		</div>
	)
}
export const RowInforItem = () => {
	const classes = useStyles()
	return (
		<div className = {classes.rowInforItem}>
			<Typography variant = 'subtitle1' sx = {{flex: 1}}>
				Rank
			</Typography>
			<Add sx = {{mx: theme.spacing(1)}}/>
			<Typography variant = 'subtitle1'>
				0 of 7
			</Typography>
		</div>
	)
}

const ColInforItem = () => {
	const classes = useStyles()
	return (
		<div className = {classes.colInforItem}>
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
									<RowInforItem />
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
				<Topbar/>
				<Divider/>
				<div className = {classes.body}>
					<Header/>
					<div className = {classes.tableContainer}>
						<PlayerDetailTable/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PlayerDetailModal