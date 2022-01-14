
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
import logo from '../asset/image/logo.png'
import { useNavigate } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        height: theme.spacing(6),
        aspectRatio: 1,
        '&:hover': {
            cursor: 'pointer'
        }
    }

}))


const GoHomeBtn = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const handleGoHome = () => {
        return navigate('/', {replace: true})
    }
    return (
        <img src = {logo} className = {classes.container}
            onClick = {handleGoHome}/>

    )
}

export default GoHomeBtn
