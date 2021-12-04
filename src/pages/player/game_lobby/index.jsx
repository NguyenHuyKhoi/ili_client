import { Alert, Container, Divider, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import Header from './components/Header'
import Lobby from './components/Lobby'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    body: {
        flex: 1
    }
}))

const GameLobby = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Header/>
            <div className = {classes.body}>
                <Lobby/>
            </div>  
        </div>
    )
}

export default GameLobby
