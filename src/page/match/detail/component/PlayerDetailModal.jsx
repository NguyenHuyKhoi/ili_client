import { PersonOutline } from '@mui/icons-material';
import { Divider, Grid, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Icon from '../../../../component/Icon';
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
		borderRadius: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',

    },
	header: {
		display: 'flex',
		flexDirection: 'row',
		padding: theme.spacing(3),
		backgroundColor: '#f5f5f5'
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
	}
}))


const ColInforItem = (props) => {
	const classes = useStyles()
	const {value, label} = props
	return (
		<div className = {classes.inforItem}>
			<Typography variant = 'bigHeader' sx = {{color: '#000'}}>
				{value}
			</Typography>
			<Typography variant = 'bigLabel' sx = {{fontWeight:'#000'}}>
				{label}
			</Typography>
		</div>
	)
}

const Header = (props) => {
	const classes = useStyles() 
	const {player} = props 
	const {rank, score, correctNum, incorrectNum} = player
    let answerNum = correctNum + incorrectNum
	let correctPercent = answerNum === 0? '0 %' : Math.round( 100 * correctNum / answerNum) + ' %'
	return (
		<div className = {classes.header}>
			<Grid container >
				<Grid item xs = {5} >
					<div className = {classes.leftHeader}>
						{/* <div className = {classes.pieChart}/> */}
						<Icon name ='DataUsage' 
							style = {{width: theme.spacing(12),height: theme.spacing(12), color: '#1368CE'}}/>
						<ColInforItem value = {correctPercent} label= 'Correct' />
					</div>
				</Grid>
				<Grid item xs = {7} >
					<Grid container columnSpacing={10}>
						<Grid item xs = {6} >
							<InforRowItem label = {'Rank'} value = {rank} icon = 'BarChartOutlined' color = '#46178F'/>
						</Grid>
						<Grid item xs = {6} >
							<InforRowItem label = {'Score'} value = {score} icon = 'MilitaryTech' color = '#1368CE'/>
						</Grid>
						<Grid item xs = {6} >
							<InforRowItem label = {'Question answered'} value = {correctNum + incorrectNum} icon = 'Help' color = '#0AA3A3'/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}
const PlayerDetailModal = (props) => {
	const classes = useStyles()
	const {match} = props 
	const {players, progress} = match 
	const [index, setIndex] = useState(0)
	useEffect(() => {
		setIndex(props.index)
		return () => {
			
		}
	}, [props.index])
	var {open} = props
	if (open == undefined) open = false
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}
	const player = players[index]
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onBackdropClick = {handleClose}
			> 
			<div className={classes.container}>
				<TopBarModal 
					leftLabel = {<PersonOutline/>}
					onClose = {handleClose} 
					onRight = {() => setIndex(index + 1)}
					onLeft = {() => setIndex(index - 1)}
					title = {player.username} 
					index = {index + 1} 
					total = {players.length}/>
				<Divider/>
				<div className = {classes.body}>
					<Header player = {player}/>
					<div className = {classes.table}>
						<PlayerDetailTable progress = {progress} player = {player}/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PlayerDetailModal