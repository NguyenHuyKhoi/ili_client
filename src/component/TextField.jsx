
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
        // textAlign: 'center'
    }
}))


const TextField = (props) => {
    const classes = useStyles()
    var {value,variant, style, disabled, placeholder, type, size, fontSize} = props
    
    if (!variant) variant = 'default'
    if (!size) size = 'medium'
    fontSize = fontSize !== null && fontSize !== undefined ? fontSize : size==='small' ? 16
        : size==='medium' ? 20
        : 24

    if (disabled === undefined) disabled = false
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          if (props.onSubmit) {
              props.onSubmit()
          }
        }
      }
    return (
        <input 
            className = {classes.container}
            disabled = {disabled || false}
            placeholder = {placeholder || ''}
            value = {value}
            type = {type ? type: 'text'}
            onChange={e => {
                if (props.onChange) {
                    props.onChange(e.target.value)
                }
            }}
            onKeyDown={handleKeyDown}
            style = {{
                fontSize,
                fontFamily: 'Setofont',
                backgroundColor: disabled ? theme.palette.background.main : theme.palette[variant].main,
                padding: theme.spacing(1.5),
                ...style,
            }}>
        </input>

    )
}

export default TextField
