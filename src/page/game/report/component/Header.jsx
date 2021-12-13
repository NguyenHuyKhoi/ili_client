import { MoreVert } from '@mui/icons-material';
import { Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { theme } from '../../../../theme';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
		flexDirection: 'row',
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
	return (
		<div className = {classes.container}>
			<Grid container>
				<Grid item xs = {9}>
					<div className = {classes.left}>
						<div className = {classes.title}>
							<Typography variant = 'subtitle1' sx = {{color: 'black'}}>
								Report
							</Typography>
							<Typography variant = 'h5' sx = {{color: 'black'}}>
								Game Title
							</Typography>
						</div>
						<div className = {classes.options}>
							<Typography variant = 'subtitle1' sx = {{color: 'black'}}>
								Report options
							</Typography>
							<MoreVert sx = {{color: 'black'}}/>
						</div>
					</div>
				</Grid>
				<Grid item xs = {3}>
					<div className = {classes.right}>
						<Typography variant = 'subtitle1' sx = {{p: theme.spacing(1.5)}}>
							Game infors detail 1
						</Typography>
						<Divider/>
						<Typography variant = 'subtitle1' sx = {{p: theme.spacing(1.5)}}>
							Game infors detail 1
						</Typography>
						<Divider/>
						<Typography variant = 'subtitle1' sx = {{p: theme.spacing(1.5)}}>
							Game infors detail 1
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export default Header