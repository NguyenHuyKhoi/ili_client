import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import HeaderBar from '../../../component/HeaderBar'
import GameTable from './component/GameTable'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    body: {
        padding: 10
    }
}))

const DashboardReportPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {3}/>
            <div className= {classes.body}>
                <GameTable/>
            </div>
          
        </div>
    )
}

export default DashboardReportPage
