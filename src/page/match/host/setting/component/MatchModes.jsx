import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import classic_mode from '../../../../../asset/image/classis_mode.png'
import youtube_mode from '../../../../../asset/image/youtube_mode.png'
import Button from '../../../../../component/Button'
import { theme } from '../../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(15)
    },
    item: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        maxHeight: theme.spacing(28),   
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(3),
        paddingTop: theme.spacing(5),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px'
    },
    logo: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: theme.spacing(5),
        padding: theme.spacing(0.4),
        position: 'absolute',
        top: theme.spacing(-5),
        left: 0,
        right: 0,
        backgroundColor: theme.palette.success.main,
        margin: 'auto'
    }
}))

export const MODE_MATCH = {
    CLASSIC: 'classic',
    LIVESTREAM: 'livestream'
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
        desc: 'Stream on Youtube, Facebook and play in chatbox.',
        link: '/match/livestream',
        icon: youtube_mode,
        mode: MODE_MATCH.LIVESTREAM
    },
]
const ModeItem = (props) => {
    const classes = useStyles()
    const {mode} = props 
    const {title, desc, icon} = mode

    return (
        <div className = {classes.item}>
            <img src = {icon}
                className = {classes.logo} alt = 'Logo'/>
            <Typography variant = 'bigLabel' 
                sx = {{ color: 'white', alignSelf: 'center'}}>
                {title}
            </Typography>
            <Typography variant = 'btnLabel' 
                sx = {{
                    color: 'white', my: theme.spacing(0.5), textAlign: 'center'}}>
                {desc}
            </Typography>
      

            <Button 
                variant = 'success' 
                size = 'small'
                onClick = {() => {
                    if (props.onSelect) props.onSelect()
                }}
                style = {{color: 'white', width: '90%', marginTop: theme.spacing(2)}}
                label = 'Choose'/>
        </div>
    )
}

const MatchModes = (props) => {
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
export default MatchModes
