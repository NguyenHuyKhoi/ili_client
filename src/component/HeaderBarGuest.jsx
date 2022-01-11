
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../theme'
import logo from '../asset/image/logo.png'
import Button from './Button'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        paddingLeft: theme.spacing(1),
        paddingRight:  theme.spacing(2),
        height: theme.spacing(7)
    },
    logo: {
        height: theme.spacing(6)
    },
    center: {
        display: 'flex',
        flex: 1
    }
}))


const HeaderBarGuest = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    
    return (
        <div className = {classes.container}>
            <div onClick = {() => navigate('/', {replace: false})}>
                <img src = {logo} className = {classes.logo}/>
            </div>
            <div className = {classes.center}/>
            <Button 
                size = 'small'
                variant = 'success'
                label = 'Sign up'
                style = {{marginRight: theme.spacing(3)}}
                onClick = {() => navigate('/auth/signup', {replace: false})}
            />
            <Button 
                size = 'small'
                label = 'Log in'
                style = {{marginRight: theme.spacing(3)}}
                onClick = {() => navigate('/auth/signup', {replace: false})}
            />
        </div>
    )
}

export default HeaderBarGuest
