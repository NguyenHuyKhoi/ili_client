
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import empty_img from '../asset/image/empty.png'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        border: '1px dashed #000',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    img: {
        height: theme.spacing(10),
        aspectRatio: 1.6
    }
}))


const EmptyBox = (props) => {
    const classes = useStyles()
    var {label, style} = props
    
    return (
        <div className= {classes.container} 
            onClick = {() => {
                if (props.onClick) props.onClick()
            }}
            style = {style === undefined? {} : style}>
            <img src = {empty_img} className = {classes.img} alt = 'Empty'/>
            <Typography variant='bigLabel' sx = {{color: '#000', mt: theme.spacing(1)}}>
                {label}
            </Typography>
        </div>

    )
}

export default EmptyBox
