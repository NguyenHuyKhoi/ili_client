
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
        textAlign: 'center'
    }
}))


const TextField = (props) => {
    const classes = useStyles()
    var {label, variant, style, disabled, placeholder, type} = props
    
    if (!variant) variant = 'default'
    return (
        <input 
            className = {classes.container}
            disabled = {disabled || false}
            placeholder = {placeholder || ''}
            type = {type ? type: 'text'}
            onChange={e => {
                if (props.onChange) props.onChange(e.target.value)
            }}
            style = {{
                fontSize: 24,
                fontFamily: 'Setofont',
                backgroundColor: theme.palette[variant].main,
                padding: theme.spacing(1.5),
                ...style,
            }}>
        </input>

    )
}

export default TextField
