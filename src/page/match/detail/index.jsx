import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import Tabbar from '../../../component/Tabbar'
import Header from './component/Header'
import PlayersTab from './component/PlayersTab'
import QuestionsTab from './component/QuestionsTab'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        backgroundColor: theme.palette.background.main,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(2)
    },
    body: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(2)
    }
}))

const MatchDetailPage = () => {
    const classes = useStyles()
    const [tabIndex, setTabIndex] = useState(0)
    const handleTabChange = (index) => {
        setTabIndex(index)
    }
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {3}/>
            <div className= {classes.header}>
                <Header />
                <Tabbar selectedIndex = {tabIndex} tabs = {['Summary','Players', 'Questions', 'Feed back']} onClickTab = {handleTabChange}/>
            </div>
            <div className= {classes.body}>
                {
                    tabIndex ===  0 ?
                        <Typography variant = 'h1'></Typography>
                    : tabIndex ===  1 ?
                        <PlayersTab/>
                    : tabIndex ===  2 ?
                        <QuestionsTab/>
                    : tabIndex ===  3 ?
                        <Typography variant = 'h1'></Typography>
                    : null
                }
            </div>
         
        </div>
    )
}

export default MatchDetailPage
