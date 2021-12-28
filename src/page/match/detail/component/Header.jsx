import { MoreVert } from '@mui/icons-material';
import { Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import  React, {useContext} from 'react';
import { MatchContext } from '../../../../context/match/other/context';
import { theme } from '../../../../theme';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
		flexDirection: 'row'
    },
	left: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		display: 'flex',
		flexDirection: 'column',

	},
	options: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: theme.spacing(10)
	},
	right: {
		display: 'flex',
		flexDirection: 'column'
	}
}))

const Header = () => {
	const classes = useStyles()

	const {match} = useContext(MatchContext)
	const {game, host, players, createAt } = match
	console.log("Match: ", match)
	return (
		<div className = {classes.container}>
			<Grid container>
				<Grid item xs = {9}>
					<div className = {classes.left}>
						<div className = {classes.title}>
							<Typography variant = 'subtitle1' sx = {{color: '#333333', fontWeight: 'bold'}}>
								Report
							</Typography>
							<Typography variant = 'h4' sx = {{color: '#333333', mt: theme.spacing(2)}}>
								{game.title}
							</Typography>
						</div>
						<div >
							<div className = {classes.options}>
								<Typography variant = 'subtitle1' sx = {{color: 'black'}}>
									Report options
								</Typography>
								<MoreVert sx = {{color: 'black'}}/>
							</div>
						</div>
						
					</div>
				</Grid>
				<Grid item xs = {3}>
					<div className = {classes.right}>
						<Typography variant = 'subtitle2' sx = {{p: theme.spacing(1.5), color: '#5f5f5f'}}>
							Live
						</Typography>
						<Divider/>
						<Typography variant = 'subtitle2' sx = {{p: theme.spacing(1.5), color: '#5f5f5f'}}>
							{'November 18, 2021, 9:28 PM'}
						</Typography>
						<Divider/>
						<Typography variant = 'subtitle2' sx = {{p: theme.spacing(1.5), color: '#5f5f5f'}}>
							Host by {host.name}
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export default Header