import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import HeaderBar from '../../../component/HeaderBar'
import ChangePasswordForm from './component/ChangePasswordForm'
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
