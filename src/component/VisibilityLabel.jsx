
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center'
    },
    row: {
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


const VisibilityLabel = (props) => {
    const classes = useStyles()
    var {visibility, hiddenByAdmin} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.row}>
                <div    
                    className = {classes.publicDot}
                    style = {{
                        backgroundColor: visibility == 'public' ? theme.palette.success.main : theme.palette.error.main
                    }}/>
                <Typography variant = 'btnLabel' sx = {{color: '#000'}}> 
                    {visibility}
                </Typography>
            </div>
            {
                visibility == 'private' && hiddenByAdmin == true && 
                <Typography 
                    variant = 'caption'>
                    Hidden by admin
                </Typography>
            }
        </div>

    )
}

export default VisibilityLabel
