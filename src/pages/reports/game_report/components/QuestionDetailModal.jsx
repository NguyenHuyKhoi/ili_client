import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Divider, Grid, Modal, Typography } from '@mui/material';
import { Add, ChevronLeft, ChevronRight, Close, PersonOutline, Square } from '@mui/icons-material';
import { theme } from "../../../../theme";
import { RowInforItem } from './PlayerDetailModal';
import PlayerDetailTable from './PlayerDetailTable';
import { grey } from '@mui/material/colors';
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
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	leftbar:{
		display: 'flex',
		flexDirection: 'row',
		flex:1,
	},
	questionImg: {
		flex: 1
	},
	rightbar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: grey[100]
	},
	body: {
		flex: 1,
		overflow: 'auto',
	},
	leftHeader: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(1),
		justifyContent: 'center'
	},
	answersContainer: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: theme.spacing(1)
	},
	answer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: theme.spacing(1)
	},
	logoContainer: {
		width: theme.spacing(3),
		height: theme.spacing(3),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
		borderRadius: theme.spacing(0.2)
	},
	tableContainer: {
		padding: theme.spacing(3)
	},
	rowInforsContainer: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(1)
	},
	numProgressContainer: {
		width:theme.spacing(20),
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2)
	},
	numProgress: {
		height: theme.spacing(1),
		borderRadius: theme.spacing(1),
		backgroundColor: 'red',
	},
	inforsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing(1)
	},
	inforItem: {
		display: 'flex',
		flexDirection: 'row'
	}
}))

const Topbar = () => {
	const classes = useStyles()
	return (
		<div className = {classes.bar}>
			<div className = {classes.leftbar}>
				<Typography variant = 'subtitle1'>
					1 - Quiz
				</Typography>
				<Typography variant = 'subtitle1'>
					Lorem ipsuone perferusandae in iusto molestias? Quibusdam, optio!
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
const InforItem = () => {
	const classes = useStyles()
	return (
		<div className = {classes.inforItem} >
			<Add/>
			<Typography variant = 'subtitle1'>
				20 time limit
			</Typography>
		</div>
	)
}
const Answer = () => {
	const classes = useStyles()
	return (
		<div className = {classes.answer}>
			<div className = {classes.logoContainer}>
				<Square sx = {{fontSize: 20, color: 'white'}}/>
			</div>
			<Typography variant = 'subtitle1' sx = {{flex: 1, mx: theme.spacing(1)}}>
				The answer 1 
			</Typography>
			<Close sx = {{color: 'red'}}/>
			<div className = {classes.numProgressContainer}>
				<div className = {classes.numProgress} style = {{width: `${20}%`}}/>
			</div>
			<Typography variant = 'subtitle1' >
				3
			</Typography>
		</div>
	)
}

const Header = () => {
	const classes = useStyles() 
	return (
		<div className = {classes.header}>
			<Grid container >
				<Grid item xs = {3} >
					<div className = {classes.leftHeader}>
						<img className = {classes.questionImg} src = 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR253HHauiRc70TkCw85lagWrKKeQdnRXv4uak2fjdGGTzA30Qdq-Ra32aQVF1EO6QzsWTuXk8w42_uDGtz6Ps'/>
					</div>
				</Grid>
				<Grid item xs = {9}>
					<div className = {classes.answersContainer}>
						{
							Array.from(Array(5)).map((_, index) => (
								<Answer />
							))
						}
					</div>
				</Grid>
			</Grid>
			<div className = {classes.inforsContainer}>
				{
					Array.from(Array(3)).map((_, index) => (
						<InforItem/>
					))
				}
			</div>
		</div>
	)
}
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
				<Topbar/>
				<Divider/>
				<div className = {classes.body}>
					<Header/>
					<div className = {classes.rowInforsContainer}>
						<Grid container rowSpacing = {3}>
							{
								Array.from(Array(3)).map((_, index) => (
									<Grid item xs = {4}>

										<RowInforItem/>
									</Grid>
								))
							}
						</Grid>
					</div>
					<div className = {classes.tableContainer}>
						<PlayerDetailTable/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default QuestionDetailModal