import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import Button from '../../../component/Button'
import HeaderBar from '../../../component/HeaderBar'
import Tabbar from '../../../component/Tabbar'
import { writeMatchReport } from '../../../context/match/helper/xlsx'
import { theme } from '../../../theme'
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

    const handleDownloadReport = async () => {
        // writeMatchReport({})
    }
    
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {3}/>
            <div className= {classes.header}>
                <Header />
                <div 
                    style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Tabbar selectedIndex = {tabIndex} tabs = {['Players', 'Questions']} onClickTab = {handleTabChange}/>
                    {/* <Button	
                        variant = 'success'
                        label = 'Get report'
                        size = 'small'
                        onClick = {handleDownloadReport}
                        style = {{marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}}
					/> */}
                </div>
            </div>
            <div className= {classes.body}>
                {
                    tabIndex ===  0 ?
                        <PlayersTab/>
                    : tabIndex ===  1 ?
                        <QuestionsTab/>
                    : null
                }
            </div>
         
        </div>
    )
}

export default MatchDetailPage
