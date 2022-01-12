import { Container, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import { theme } from '../../../theme'
import { Tabs } from '../../game/library/component/GameList'
import ChangePasswordForm from './component/ChangePasswordForm'
import NotificationSettings from './component/NotificationSettings'
import UserInforForm from './component/UserInforForm'



const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.palette.background.main,
        height: '100vh',
        overflow: 'auto'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(15),
        paddingTop: theme.spacing(5)
    }
}))

const SettingPage = () => {
    const classes = useStyles()

    const [tabIndex, setTabIndex] = useState(0)
    const handleTabChange = (index) => {
        setTabIndex(index)
    }

    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <div className = {classes.body}>
                <Grid container 
                    columnSpacing = {10}>
                    <Grid item xs = {6} >
                        <UserInforForm/>
                    </Grid>
                    <Grid item xs = {6} >
                        <ChangePasswordForm/>
                    </Grid>
                </Grid>
            </div>
         
        </div>
    )
}

export default SettingPage
