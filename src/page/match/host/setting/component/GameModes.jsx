import { Button, Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import classic_mode from '../../../../../asset/image/classis_mode.png'
import youtube_mode from '../../../../../asset/image/youtube_mode.png'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(10)
    },
    item: {
        height: theme.spacing(20),
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(2),
        paddingTop: theme.spacing(6)
    },
    logo: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: theme.spacing(5),
        position: 'absolute',
        top: theme.spacing(-5),
        left: 0,
        right: 0,
        backgroundColor: 'white',
        margin: 'auto'
    },
    infor: {
        flex: 1, 
        flexDirection: 'column'
    },
}))

export const MODE_MATCH = {
    CLASSIC: 0,
    LIVESTREAM: 1
}

const modes = [
    {
        title: 'Classic',
        desc: 'Player go head-to-head using their own devices.',
        link: '/match/host/lobby',
        icon: classic_mode,
        mode: MODE_MATCH.CLASSIC
    },
    {
        title: 'Livestream',
        desc: 'Stream your game on Youtube, Facebook and viewer can play in chatbox.',
        link: '/match/livestream',
        icon: youtube_mode,
        mode: MODE_MATCH.LIVESTREAM
    },
]
const ModeItem = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {mode} = props 
    const {title, desc, link, icon} = mode

    return (
        <div className = {classes.item}>
            <img src = {icon}
                className = {classes.logo}/>
            <div className = {classes.infor}>
                <Typography variant = 'h6' 
                    sx = {{
                        color: 'white', fontWeight: 'bold', alignSelf: 'center', textAlign: 'center'}}>
                    {title}
                </Typography>
                <Typography variant = 'subtitle1' 
                    sx = {{
                        color: 'white', alignSelf: 'center', textAlign: 'center', my: theme.spacing(1), 
                            px: theme.spacing(6)}}>
                    {desc}
                </Typography>
            </div>
      

            <Button variant = 'contained' color = 'success'  
                onClick = {() => {
                    if (props.onSelect) props.onSelect()
                }}
                sx = {{color: 'white', fontWeight: 'bold', textTransform: 'none', width: '90%'}}>
                Play
            </Button>
        </div>
    )
}

const GameModes = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Grid container columnSpacing = {6} rowSpacing = {6}>
                {
                    modes.map((mode, index) => (
                        <Grid item xs = {6}   key = {''+index}>
                            <ModeItem mode = {mode} 
                                onSelect = {() => {
                                    if (props.onSelectMode) props.onSelectMode(mode.mode) 
                                }}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}
export default GameModes
