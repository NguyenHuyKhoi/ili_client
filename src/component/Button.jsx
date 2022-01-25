
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
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
    var {label, variant, style, disabled, size} = props
    
    if (!variant) variant = 'default'
    if (!size) size = 'medium'
    return (
        <div className = {classes.container}
            disabled = {disabled || false}
            onClick = {(e) => {
                if (props.onClick) props.onClick(e)
            }}
            style = {{
                backgroundColor: theme.palette[variant].main,
                padding: size ==='small' ? theme.spacing(0.4) 
                        : size ==='medium' ? theme.spacing(1) 
                        : theme.spacing(1.5),
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
