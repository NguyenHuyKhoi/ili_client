import { Alert, Container, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import Question from './components/Question'
import InputCard from './components/Question'
import UserBar from './components/UserBar'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }
}))

const INPUT_STAGE = {
    ENTER_PIN: 0, 
    ENTER_NAME: 1
}
const PlayerInGame = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.questionContainer}>
                <Question/>
            </div>  
            <UserBar/>
        </div>
    )
}

export default PlayerInGame
