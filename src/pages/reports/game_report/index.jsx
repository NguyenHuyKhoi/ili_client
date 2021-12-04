import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React from 'react'
import { Tabs } from '../../library/components/GameLibrary'
import GameStatTable from './components/PlayerTable'
import Header from './components/Header'
import PlayerTable from './components/PlayerTable'
import QuestionTable from './components/QuestionTable'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    }
}))

const GameReport = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Header/>
            <Tabs/>
            <QuestionTable/>
        </div>
    )
}

export default GameReport
