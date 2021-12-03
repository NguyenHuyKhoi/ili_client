import { Add, ClassSharp } from '@mui/icons-material'
import { AppBar, Avatar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import logo from '../../../assets/images/logo.jpg'
import { theme } from '../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: 100,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column'
    },
}))


const GameFilter = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            Hello world
        </div>
    )
}

export default GameFilter
