import { Container, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Tabs } from '../../game/library/component/GameList'
import Header from './component/Header'
import QuestionsTab from './component/QuestionsTab'
import PlayersTab from './component/PlayersTab'
import HeaderBar from '../../../component/HeaderBar'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    },
    body: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    }
}))

const GameReportPage = () => {
    const classes = useStyles()
    const [tabIndex, setTabIndex] = useState(0)
    const handleTabChange = (index) => {
        setTabIndex(index)
    }
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {3}/>
            <div className= {classes.body}>
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
         
        </div>
    )
}

export default GameReportPage
