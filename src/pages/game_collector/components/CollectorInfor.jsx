import { Add, ClassSharp } from '@mui/icons-material'
import { AppBar, Avatar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import logo from '../../../assets/images/logo.jpg'
import { theme } from '../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column'
    },
    gameImg: {
        width: '100%',
        height: 250
    },
    body: {
        flex:1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    btnBar: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(1)
    },
    ownerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ownerInfor: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(1)
    }
}))

const OwnerInfor = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.ownerContainer}>
            <Avatar alt="Remy Sharp" src="../../../assets/images/logo.jpg" />
            <div className ={classes.ownerInfor}>
                <Link href="#" underline="hover" color = {'black'}>
                    Game Owner
                </Link>
                <Typography variant = 'subtitle2'>
                    Update 1 hour ago
                </Typography>
            </div>
        </div>
    )
}

const CollectorInfor = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <img className = {classes.gameImg} src = {logo}/>
            <div className = {classes.body} >
                <OwnerInfor/>
            </div>
           
        </div>
    )
}

export default CollectorInfor
