import { MoreVert } from '@mui/icons-material'
import { Avatar, Grid, Link, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import GameCellItem from '../../../game/component/GameCellItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column'
    },
}))


const GameList = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.list} >
                <Grid container sx = {{flex: 1}} columnSpacing = {2} rowSpacing = {2}>
                {

                    Array.from(Array(40)).map((_, index) => (
                        <Grid item xs = {3}   key = {''+index}>
                            <GameCellItem/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
        </div>
    )
}

export default GameList
