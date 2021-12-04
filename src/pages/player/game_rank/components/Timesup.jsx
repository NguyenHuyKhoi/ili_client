import { Add, CheckCircleTwoTone, CheckTwoTone, ClassSharp, ClearTwoTone, Square } from '@mui/icons-material'
import { AppBar, Avatar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { theme } from '../../../../theme'
import { grey, red } from '@mui/material/colors'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex:1,
        height:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple'
    },
    scoreContainer: {
        backgroundColor: 'black',
        opacity: 0.8,
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
        borderRadius: theme.spacing(0.5),
        marginTop: theme.spacing(2)
    },
    iconContainer: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: theme.spacing(6),
        border: '6px solid #ffffff',
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(2)
    }
}))
const Timesup = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Typography variant = 'h4' sx = {{fontWeight: 'bold', color: 'white'}}> 
                Time's up
            </Typography>
            <div className = {classes.iconContainer}>
                <ClearTwoTone sx = {{color: 'white', fontSize: 50}}/>
            </div>
            <div className = {classes.scoreContainer}>
                <Typography variant = 'h6' sx = {{fontWeight: 'bold', color: 'white'}}>
                    We believe in you!  
                </Typography>
            </div>
            <Typography variant = 'h5'>  </Typography>
        </div>
    )
}

export default Timesup
