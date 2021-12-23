
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
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
export const LinkedLoginButton = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <img className = {classes.img}
                src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'/>
            <Typography variant = 'subtitle1'>
                Continue with Google
            </Typography>
        </div>
    )
}
