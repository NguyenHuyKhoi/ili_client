import { Add, Check, ClassSharp, CropSquare, MoreVert, Square, Star } from '@mui/icons-material'
import { AppBar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import LabeledSelect from '../../../components/Select'
import { theme } from '../../../theme'
import { grey, blue } from '@mui/material/colors';
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    games: {
        display:'flex',
        flexDirection:'column'
    },
    gameContainer: {
        marginBottom: theme.spacing(2),
        display:'flex',
        flexDirection:'column'
    },
    game: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        padding: theme.spacing(0.5)
    },
    gameLeft: {
        position: 'relative'
    },
    gameImg: {
        height: '100%',
        width: 160,
    },
    gameRight: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    gameRightTop: {
        flex:1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(2)
    },
    gameRightBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: grey[100],
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2)
    },
    gameQuestionNums: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.8,
        zIndex: 99
    },
    gameDraftTag: {
        position: 'absolute',
        top: theme.spacing(0.5),
        left: theme.spacing(0.5),
        padding: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'red',
        opacity: 0.8,
        zIndex: 99
    },
}))


export const GameHorizontalCard = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.game} style={{backgroundColor: props.selected ? grey[100]:'white'}}>
            <div className = {classes.gameLeft}>
                <img className = {classes.gameImg} src = 'https://vnn-imgs-a1.vgcloud.vn/image-english.vov.vn/h500/uploaded/vn1pm7jlycly8uzveukg/2019_11_28/1_LDJZ.jpg'/>
                <div className = {classes.gameQuestionNums}>
                    <Typography variant = 'caption' sx = {{color: 'white'}}> 12 questions </Typography>
                </div>
                <div className = {classes.gameDraftTag}>
                    <Typography variant = 'caption' sx = {{color: 'white'}}> Drag </Typography>
                </div>
            </div>
            <div className = {classes.gameRight}>
                <div className = {classes.gameRightTop}>
                    <Typography variant = 'subtitle1' sx = {{color: 'black', fontWeight: 'bold', flex: 1}}> Game title</Typography>
                    <Star sx = {{color: 'yellow'}} />
                    <MoreVert/>
                </div>
                <div className = {classes.gameRightBottom}>
                    <Typography variant = 'subtitle1' sx = {{color: 'black', flex: 1}}> Game Owner</Typography>
                    <Button variant = 'contained' size = 'small' color = 'primary' sx = {{ml: theme.spacing(2)}}>Edit </Button>
                    <Button variant = 'contained' size = 'small' color = 'success' sx = {{ml: theme.spacing(2)}}>Play </Button>
                </div>
            </div>
        </div>
    )
}

const GameList = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.games} >
            {
                Array.from(Array(3)).map((_, index) => (
                    <div className = {classes.gameContainer}>
                        <GameHorizontalCard/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GameList
