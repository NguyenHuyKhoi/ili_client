import { Add, Check, ClassSharp, CropSquare, MoreVert, Square } from '@mui/icons-material'
import { AppBar, Avatar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import LabeledSelect from '../../../components/Select'
import { theme } from '../../../theme'
import { grey, blue } from '@mui/material/colors';
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    games: {
        display:'flex',
        flexDirection:'column'
    },
    game: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:'gray'
    },
    gameInfor: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1),
        backgroundColor: 'white',
        alignItems: 'center'
    },
    gameImg: {
        width: '100%',
        height: 200
    },
    gameInforBody: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
}))

export const GameCard = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.game} >
            <img className = {classes.gameImg} src = 'https://vnn-imgs-a1.vgcloud.vn/image-english.vov.vn/h500/uploaded/vn1pm7jlycly8uzveukg/2019_11_28/1_LDJZ.jpg'/>
            <div className = {classes.gameInfor}>
                <Avatar alt="Remy Sharp" src="../../../assets/images/logo.jpg" />
                <div className = {classes.gameInforBody}>
                    <Typography variant = 'subtitle1'>Game Title</Typography>
                    <Typography variant = 'subtitle2'>Game Owner</Typography>
                </div>
                <MoreVert />
            </div>
        </div>
    )
}
const GameList = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.games} >
                <Grid container sx = {{flex: 1}} columnSpacing = {2} rowSpacing = {2}>
                {

                    Array.from(Array(40)).map((_, index) => (
                        <Grid item xs = {3}>
                            <GameCard/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
        </div>
    )
}

export default GameList
