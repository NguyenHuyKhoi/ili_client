
import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../theme'

const Link = (props) => {
    const navigate = useNavigate()
    var {label, link, style, variant} = props

    if (variant ===undefined) variant = 'label'
    return (
        <div 
            onClick = {() => {
                if (link ===undefined) {
                    if (props.onClick) props.onClick()
                    return 
                }
                return navigate(link, {replace: false}) }}
            style = {style ? style : {}} >
            <Typography variant = {variant}
                sx = {{
                
                    color: theme.palette.success.main,
                    textDecoration: 'underline',
                    '&:hover': {
                        cursor: 'pointer'
                    }}}>
                {label}
            </Typography>
        </div>

    )
}

export default Link
