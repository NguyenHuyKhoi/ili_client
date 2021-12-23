import { ArrowDropDown, ArrowLeft } from '@mui/icons-material'
import { Button, Grid, Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/auth/context'
import { GameContext } from '../../../../context/game/other/context'
import { createMatchAPI } from '../../../../context/match/play/apiCalls'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { theme } from '../../../../theme'
import GameModes from './component/GameModes'
import GameModeItem from './component/GameModes'
import GameOptions from './component/GameOptions'
import Header from './component/Header'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'purple'
    },
    body: {
        flex: 1,
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(40),
        paddingRight: theme.spacing(40)
    },
    title: {
        flex: 1,
        padding: theme.spacing(1.5),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}))

const MatchHostSettingPage = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {dispatch, match} = useContext(MatchPlayContext)
    const {game} = useContext(GameContext)
    const {user} = useContext(AuthContext)
    const handleStart = () => {
        createMatchAPI(
            {
                title: game.title,
                gameId: game._id
            },
            user,
            dispatch
        )
        navigate('/match/host/lobby', {replace: false})
    }

    const {title} = game
    return (
        <div className = {classes.container}>
            <Header/>
            <div className = {classes.body}>
                <div className= {classes.bodyHeader} >
                    <div className = {classes.title}>
                        <Typography variant = 'h5' sx = {{color: 'black', fontWeight: 'bold'}}>
                            {title}
                        </Typography>
                    </div>
                    <Button variant = 'contained' color = 'success' sx = {{ml: theme.spacing(5)}}
                        onClick ={handleStart}>
                            Play
                    </Button>
                </div>
               
                <GameModes/>
                <GameOptions/>
            </div>  
        </div>
    )
}

export default MatchHostSettingPage
