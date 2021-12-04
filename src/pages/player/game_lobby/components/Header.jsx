import { Add, ClassSharp, Fullscreen, Language, MusicNote, Square, VolumeDown } from '@mui/icons-material'
import { AppBar, Avatar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { theme } from '../../../../theme'
import { grey, red } from '@mui/material/colors'
import { ThemeContext } from 'styled-components'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'violet',
        padding: theme.spacing(1.5)
    },
    langContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(3),
        alignSelf: 'flex-start'
    },
    pinContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(1.5)
    },
    btnsContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    iconContainer: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: theme.spacing(2),
        backgroundColor: 'white',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

}))
const Header = (props) => {
    const classes = useStyles()

    return (
        <div className = {classes.container}>   
            <div className = {classes.langContainer}>
                <Language   sx = {{color: 'black', fontSize: 20}} />
                <Typography variant = 'subtitle1' sx  ={{ml: theme.spacing(1),fontWeight: 'bold', color: 'black'}}>EN</Typography>
            </div>
            <div className = {classes.pinContainer}>
                <Typography variant = 'h6' sx  ={{ color: 'black'}}>Game pin</Typography>
                <Typography variant = 'h1'  sx  ={{ color: 'black', fontWeight: 'bold'}}> 
                    123 585
                </Typography>
            </div>
            <div className = {classes.btnsContainer}>
                <div className = {classes.iconContainer}>
                    <Fullscreen sx = {{color: 'black', fontSize: 20}} />
                </div>
                <div className = {classes.iconContainer}>
                    <MusicNote sx = {{color: 'black', fontSize: 20}}/>
                </div>
                <div className = {classes.iconContainer}>
                    <VolumeDown sx = {{color: 'black', fontSize: 20}} />
                </div>
            </div>
        </div>
    )
}

export default Header
