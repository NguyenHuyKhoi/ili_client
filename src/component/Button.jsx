
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: theme.spacing(1),
        minWidth: theme.spacing(10),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))


const Button = (props) => {
    const classes = useStyles()
    var {label, variant, style, disabled} = props
    
    if (!variant) variant = 'default'
    return (
        <div className = {classes.container}
            disabled = {disabled || false}
            onClick = {(e) => {
                if (props.onClick) props.onClick(e)
            }}
            style = {{
                backgroundColor: theme.palette[variant].main,
                ...style,
            }}>
            <Typography variant = 'btnLabel' className = {classes.label}>
                {
                    label
                }
            </Typography>
        </div>

    )
}

export default Button
