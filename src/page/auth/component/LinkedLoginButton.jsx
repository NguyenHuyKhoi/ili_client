
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import facebook_icon from '../../../asset/image/facebook_icon.png'
import google_icon from '../../../asset/image/google_icon.png'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        border: '1px solid gray',
        borderRadius: theme.spacing(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(1)
    },
    img: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: theme.spacing(2),
        top: 0,
        bottom:0,
        margin: 'auto'
    },
}))

const types = {
    google: {
        img: google_icon,
        label: 'Continue with Google'
    },
    facebook: {
        img: facebook_icon,
        label: 'Continue with Facebook'
    }
}
export const LinkedLoginButton = (props) => {
    const classes = useStyles()
    const {type} = props 
    const {img, label} = types[type]
    return (
        <div className = {classes.container}>
            <img className = {classes.img}
                src = {img }
                />
            <Typography variant = 'subtitle1'>
               {label}
            </Typography>
        </div>
    )
}
