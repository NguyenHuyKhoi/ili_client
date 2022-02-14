
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
import { Icon } from './Icon'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))


const IconButton = (props) => {
    const classes = useStyles()
    var {icon, variant, style, disabled, size} = props
    
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
                padding: size ==='small' ? theme.spacing(0.6) 
                        : size ==='medium' ? theme.spacing(1) 
                        : theme.spacing(1.5),
                ...style,
            }}>
            <Icon name = {icon} style = {{color: '#000'}}/>
        </div>

    )
}

export default IconButton
