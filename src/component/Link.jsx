
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
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


const Link = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    var {label, link, style} = props

    return (
        <div 
            onClick = {() => {
                if (link == undefined) return
                return navigate(link, {replace: true}) }}
            style = {style ? style : {}} >
            <Typography variant = 'label' 
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
