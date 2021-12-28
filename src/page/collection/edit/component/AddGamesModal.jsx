import { Button, Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, {useContext} from 'react';
import { CollectionContext } from '../../../../context/collection/context';
import { GameContext } from '../../../../context/game/other/context';
import { theme } from "../../../../theme";
import { GameItem } from './GameItem';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '40vw',
		backgroundColor: 'white',
		borderRadius: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',

    },
	header: {
		padding: theme.spacing(3),
		borderTopLeftRadius: theme.spacing(1),
		borderTopRightRadius: theme.spacing(1),
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column'
	},
	body: {
		display: 'flex',
		padding: theme.spacing(3),
		flexDirection: 'column',
		backgroundColor: grey[200],
		overflow: 'auto',
		maxHeight: '50vh'
	},
	question: {
		marginBottom: theme.spacing(2),
	},
	footer: {
		padding: theme.spacing(2),
		borderBottomLeftRadius: theme.spacing(1),
		borderBottomRightRadius: theme.spacing(1),
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	}
}))

const AddGamesModal = (props) => {
	const classes = useStyles()

	const allGames = useContext(GameContext).games
	const {collection} = useContext(CollectionContext)
	const {games} = collection
	var {open, questions} = props
	if (open == undefined) open = false
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}

	const inAddedGames = (id) => {
		const ids = games.map((item) => item._id)
		return ids.indexOf(id) != -1
	}
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onBackdropClick = {handleClose}>
			<div className={classes.container}>
				<div className = {classes.header}>
					<Typography variant = 'h5' sx = {{fontWeight: 'bold', color: '#333333'}}>
						Choose Games
					</Typography>
				</div>
				<div className= {classes.body}>
					{
						allGames.map((game, index) => (
							<GameItem game = {game}
								key = {''+ index}
								isAdded = {inAddedGames(game._id)}
								/>
						))
					}
				</div>
				<div className = {classes.footer}>
					<Button variant="contained" color="success" 
						sx = {{ml: theme.spacing(2), fontWeight: 'bold', textTransform: 'none'}}
						onClick = {handleClose}>
						Done
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default AddGamesModal