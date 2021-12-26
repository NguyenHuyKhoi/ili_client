import { Container, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState , useContext} from 'react'
import { Tabs } from '../../game/library/component/GameList'
import Header from './component/Header'
import QuestionsTab from './component/QuestionsTab'
import PlayersTab from './component/PlayersTab'
import HeaderBar from '../../../component/HeaderBar'
import { MatchContext } from '../../../context/match/other/context'


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

const MatchDetailPage = () => {
    const classes = useStyles()
    const {match} = useContext(MatchContext)
    const [tabIndex, setTabIndex] = useState(0)
    const handleTabChange = (index) => {
        setTabIndex(index)
    }

    const {game, host, players, progress } = match
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {3}/>
            <div className= {classes.body}>
                <Header />
                <Tabs tabs = {['Summary','Players', 'Questions', 'Feed back']} onClickTab = {handleTabChange}/>
                {
                    tabIndex == 0 ?
                        <Typography variant = 'h1'></Typography>
                    : tabIndex == 1 ?
                        <PlayersTab/>
                    : tabIndex == 2 ?
                        <QuestionsTab/>
                    : tabIndex == 3 ?
                        <Typography variant = 'h1'></Typography>
                    : null
                }
            </div>
         
        </div>
    )
}

export default MatchDetailPage
