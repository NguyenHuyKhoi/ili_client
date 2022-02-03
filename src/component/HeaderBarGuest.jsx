
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../asset/image/logo.png'
import { theme } from '../theme'
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
        height: theme.spacing(6),
        '&:hover': {
            cursor: 'pointer'
        }
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
            <div onClick = {() => navigate('/', {replace: true})}>
                <img src = {logo} className = {classes.logo} alt = 'Logo'/>
            </div>
            <div className = {classes.center}/>
            <Button 
                size = 'small'
                variant = 'success'
                label = 'Sign up'
                style = {{marginRight: theme.spacing(3)}}
                onClick = {() => navigate('/signup', {replace: true})}
            />
            <Button 
                size = 'small'
                label = 'Log in'
                style = {{marginRight: theme.spacing(3)}}
                onClick = {() => navigate('/login', {replace: true})}
            />
        </div>
    )
}

export default HeaderBarGuest
