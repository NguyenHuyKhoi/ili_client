import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import GameFilter from './components/GameFilter'
import GameInfor from './components/GameFilter'
import GameList from './components/GameList'
import QuestionList from './components/GameList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: theme.spacing(8),
        paddingTop: theme.spacing(3),

    }
}))

const GameSearch = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <GameFilter/>
            <GameList/>
        </div>
    )
}

export default GameSearch
