
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    publicDot: {
        width: theme.spacing(1),
        height: theme.spacing(1),
        borderRadius: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}))


const ActiveDot = (props) => {
    const classes = useStyles()
    var {isActive, labels} = props
    
    return (
        <div className = {classes.container}>
            <div    
            className = {classes.publicDot}
            style = {{
                backgroundColor: isActive ? theme.palette.success.main : theme.palette.error.main
            }}/>
        <Typography variant = 'btnLabel' sx = {{color: '#000'}}> 
            {isActive ? labels[0]: labels[1]}
        </Typography>
        </div>

    )
}

export default ActiveDot
