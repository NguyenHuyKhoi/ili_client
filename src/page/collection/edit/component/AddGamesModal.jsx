import { Modal, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, {useContext} from 'react';
import Button from '../../../../component/Button';
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
		backgroundColor: theme.palette.secondary.main,
		// borderRadius: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 5px 225px 5px/5px 225px 5px 255px',

    },
	header: {
		paddingTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column'
	},
	body: {
		display: 'flex',
		margin: theme.spacing(2),
		flexDirection: 'column',
		overflow: 'auto',
		maxHeight: '50vh'
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
					<Typography variant = 'header' sx = {{ color: '#000', alignSelf: 'center'}}>
						Choose Games
					</Typography>
				</div>
				<div className= {classes.body}>
					{
						allGames.map((game, index) => (
							<div style = {{marginBottom: theme.spacing(2)}}>
								<GameItem game = {game}
									key = {''+ index}
									isAdded = {inAddedGames(game._id)}
									/>
							</div>
						))
					}
				</div>

				<Button 
					variant="primary"
					onClick = {handleClose}
					style = {{width: theme.spacing(20), alignSelf: 'center', margin: theme.spacing(3	)}}
					label = 'Done'/>
			</div>
		</Modal>
	);
}

export default AddGamesModal