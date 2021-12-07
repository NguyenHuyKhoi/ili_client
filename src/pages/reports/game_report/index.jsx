import { Container, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Tabs } from '../../library/components/GameLibrary'
import Header from './components/Header'
import PlayerDetailModal from './components/PlayerDetailModal'
import QuestionDetailModal from './components/QuestionDetailModal'
import QuestionsTab from './components/QuestionsTab'
import PlayersTab from './components/PlayersTab'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    }
}))

const GameReport = () => {
    const classes = useStyles()
    const [tabIndex, setTabIndex] = useState(0)
    const handleTabChange = (index) => {
        setTabIndex(index)
    }
    return (
        <div className = {classes.container}>
            <Header/>
            <Tabs tabs = {['Summary','Players (3)', 'Questions (7)', 'Feed back']} onClickTab = {handleTabChange}/>
            {
                tabIndex == 0 ?
                    <Typography variant = 'h1'>No infor now</Typography>
                : tabIndex == 1 ?
                    <PlayersTab/>
                : tabIndex == 2 ?
                    <QuestionsTab/>
                : tabIndex == 3 ?
                    <Typography variant = 'h1'>No infor now</Typography>
                : null
            }
        </div>
    )
}

export default GameReport
