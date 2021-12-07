import { Container, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import HeaderBar from '../../components/HeaderBar'
import { theme } from '../../theme'
import { Tabs } from '../library/components/GameLibrary'
import ChangePasswordForm from './components/ChangePasswordForm'
import NotificationSettings from './components/NotificationSettings'
import UserInforForm from './components/UserInforForm'



const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: grey[200],
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

const Settings = () => {
    const classes = useStyles()
    const [tabIndex, setTabIndex] = useState(0)
    const handleTabChange = (index) => {
        setTabIndex(index)
    }
    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <div className = {classes.body}>
                <Typography variant = 'h4' sx = {{fontWeight: 'bold', mb: theme.spacing(3)}}>
                    Settings
                </Typography>
                <Tabs tabs = {['Edit Profile','Privacy', 'Change Password']} onClickTab = {handleTabChange}/>
                {
                    tabIndex == 0 ?
                        <Grid container sx = {{mt: theme.spacing(4)}} >
                            <Grid item xs = {6} >
                                <UserInforForm/>
                            </Grid>
                        </Grid>
                    : tabIndex == 1 ?
                        <Grid container sx = {{mt: theme.spacing(4)}} >
                            <Grid item xs = {6} >
                                <NotificationSettings/>
                            </Grid>
                        </Grid>
                    : tabIndex == 2 ?
                        <Grid container sx = {{mt: theme.spacing(4)}} >
                            <Grid item xs = {6} >
                                <ChangePasswordForm/>
                            </Grid>
                        </Grid>
                    : null
                }
            </div>
         
        </div>
    )
}

export default Settings
