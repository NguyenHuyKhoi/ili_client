import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import ChangePasswordForm from './component/ChangePasswordForm'
import UserInforForm from './component/UserInforForm'
import SideMenu from '../../../component/SideMenu'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'auto'
    },
    body: {
        display: 'flex',
        height: '92vh',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(5),
        backgroundColor: theme.palette.background.main,
        paddingRight: theme.spacing(40),
        paddingLeft: theme.spacing(40)
    }
}))

const SETTING_MENUS = [
    {
        title: 'Profile',
        icon: 'Person'
    },
    {
        title: 'Change password',
        icon: 'Password'
    },
]

const SettingPage = () => {
    const classes = useStyles()
    const [menuIndex, setMenuIndex] = useState(0)
    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu 
                        selectedIndex = {menuIndex}
                        menus = {SETTING_MENUS}
                        onSelectItem = {(index) => setMenuIndex(index)}/>
                </Grid>
                <Grid item sm={10}>
                    <div className = {classes.body}>
                        {
                            menuIndex == 0 ? 
                            <UserInforForm/>
                            :
                            <ChangePasswordForm />
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default SettingPage
