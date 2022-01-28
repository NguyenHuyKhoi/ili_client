
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../asset/image/logo.png'
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        height: theme.spacing(6),
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
            alt = 'Logo'
            onClick = {handleGoHome}/>

    )
}

export default GoHomeBtn
