import { Pentagon, PentagonOutlined } from '@mui/icons-material'
import { Alert, Container, Divider, Grid, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import Correct from './components/Correct'
import Header from './components/Header'
import Incorrect from './components/Incorrect'
import Question from './components/Question'
import InputCard from './components/Question'
import Timesup from './components/Timesup'
import UserBar from './components/UserBar'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'purple',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex:1,
    },
    titleContainer: {
        padding: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
    },
    playerRanks: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(15)
    },
    playerRank: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1.5),
        backgroundColor: 'red',
        justifyContent: 'space-between',
        borderRadius: theme.spacing(1)
    },
    rankInfor: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    playerRankContainer: {
        marginBottom: theme.spacing(2)
    },
    scoreContainer: {
        padding: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        marginLeft: theme.spacing(2)
    }
}))

const PlayerRank = (props) => {
    const classes = useStyles() 
    return (
        <div className = {classes.playerRank} style = {{
            width: `${props.widthPercent}%`
        }}>
            <div className = {classes.rankInfor}>
                <Typography variant = 'h4' sx = {{color: 'white', fontWeight: 'bold'}}>
                    1
                </Typography>
                <div className = {classes.scoreContainer}>
                    <Typography variant = 'h6' sx = {{color: 'black', fontWeight: 'bold'}}>
                        650
                    </Typography>
                </div>
            </div>
          
            <Typography variant = 'h4' sx = {{color: 'white', fontWeight: 'bold'}}>
                User name
            </Typography>
        </div>
    )
}
const GameRank = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.header} >
                <div className = {classes.titleContainer}>
                    <Typography variant = 'h6' sx = {{color: 'black', fontWeight: 'bold'}}>
                        Title Game
                    </Typography>
                </div>
            </div>
            <div className = {classes.body}>
                <div className = {classes.playerRanks}>
                    {
                        Array.from(Array(3)).map((_, index) => (
                            <div className = {classes.playerRankContainer}>
                                <PlayerRank widthPercent = { index < 5? 100 - index *10 : 50  }/>
                            </div>
                        ))
                    }
                </div>  
            </div>
           
        </div>
    )
}

export default GameRank
