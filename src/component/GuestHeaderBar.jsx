import { Button, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../theme'
import Tabbar, { TabItem } from './Tabbar'
import logo from '../asset/image/logo.png'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
       // height: theme.spacing(7),
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight:  theme.spacing(2)
    },
    logo: {
        height: theme.spacing(5)
    },
    menu: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    tabItem: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1.5),
        alignItems: 'center',
        marginLeft: theme.spacing(1.5)
    },
    avatarPopover: {
        display: 'flex',
        width: 300,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(2)
    },
    avatarPopoverHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatarPopoverFooter: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center'
    }
}))

const tabs = [
    {
        label: 'Home',
        link: '/',
        icon: 'Home'
    }
]

const GuestHeaderBar = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {selectedIndex} = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    

    const open = Boolean(anchorEl);
    return (
        <div className = {classes.container}>
            <div onClick = {() => navigate('/', {replace: false})}>
                <img src = {logo} className = {classes.logo}/>
            </div>
            
            <Tabbar tabs = {tabs} selectedIndex = {selectedIndex}/>
            <Button variant = 'outlined' 
                sx = {{color: '#333333', borderColor: 'rgba(0,0,0,0)', fontWeight: 'bold', textTransform: 'none'}}
                onClick = {() => navigate('/match/player/entrance', {replace: false})}>
                Play
            </Button>
            <Button variant = 'contained' 
                sx = {{mx: theme.spacing(2),color: 'white', fontWeight: 'bold', textTransform: 'none'}} 
                onClick = {() => navigate('/auth/signup', {replace: false})}>
                Sign up
            </Button>
            <Button variant = 'out  lined' 
                sx = {{color: '#333333', borderColor: 'rgba(0,0,0,0)', fontWeight: 'bold', textTransform: 'none'}}
                onClick = {() => navigate('/auth/login', {replace: false})}>
                Log in
            </Button>
        </div>
    )
}

export default GuestHeaderBar
