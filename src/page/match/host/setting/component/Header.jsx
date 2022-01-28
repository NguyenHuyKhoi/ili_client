import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../../../asset/image/logo.png'
import { theme } from '../../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(1)
    },
    logo: {
        height: theme.spacing(5),
        '&:hover': {
            cursor: 'pointer'
        }
    }

}))
const Header = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const handleGoHome = () => {
        return navigate('/', {replace: true})
    }
    return (
        <div className = {classes.container}>   
            <img src = {logo} className = {classes.logo}
                onClick = {handleGoHome} alt = 'Logo'/>
            <Typography variant = 'bigHeader'  
                sx  ={{ color: theme.palette.success.main, fontWeight: 'bold'}}> 
                Create new match
            </Typography>
            <div/>
        </div>
    )
}

export default Header
