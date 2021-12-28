import { Grid, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import GameCellItem from '../../../game/component/GameCellItem'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    games: {
        display:'flex',
        flexDirection:'column',
        marginTop: theme.spacing(1.5)
    }
}))

const CollectionSlideItem = (props) => {
    const classes = useStyles()
    const {collection} = props
    const {title, games} = collection
    return (
        <div className = {classes.container}>
            
            <div className = {classes.header} > 
                <Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}}>
                    {title}
                </Typography>
                <Link underline = 'hover' href = '/collection/detail'  sx = {{fontSize: 16, fontWeight: 'bold', color: '#333333'}}>
                    See all
                </Link>
            </div>
            <div className={classes.games}>
                <Grid container sx = {{flex: 1}} columnSpacing = {2} rowSpacing = {2}>
                    {

                        games.map((game, index) => (
                            <Grid item xs = {3}   key = {''+index}>
                                <GameCellItem disableProfileLink = {true}
                                    game = {game}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}

export default CollectionSlideItem
