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
        flexDirection:'column'
    }
}))

const CollectionSlideItem = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            
            <div className = {classes.header} > 
                <Typography variant = 'h6'>Title</Typography>
                <Link underline = 'hover' href = '/collection/detail' sx = {{color: 'black'}}>See all</Link>
            </div>
            <div className={classes.games}>
                <Grid container sx = {{flex: 1}} columnSpacing = {2} rowSpacing = {2}>
                    {

                        Array.from(Array(4)).map((_, index) => (
                            <Grid item xs = {3}   key = {''+index}>
                                <GameCellItem disableProfileLink = {true}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}

export default CollectionSlideItem
