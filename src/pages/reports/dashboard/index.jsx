import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import GameTable from './components/GameTable'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: theme.spacing(10)
    }
}))

const DashboardReports = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <GameTable/>
        </div>
    )
}

export default DashboardReports
