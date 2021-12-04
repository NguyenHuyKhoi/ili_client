import { Add, ClassSharp, Square } from '@mui/icons-material'
import { AppBar, Avatar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { theme } from '../../../../theme'
import { grey, red } from '@mui/material/colors'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: grey[200],
        flexDirection: 'column',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(3)
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    },
    timerContainer: {
        width: theme.spacing(14),
        height:  theme.spacing(14),
        borderRadius:  theme.spacing(7),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'violet',
        position: 'absolute',
        left: theme.spacing(2),
        top: 0,
        bottom: 0,
        margin: 'auto'
    },
    img: {
        width: 520,
        height: 260,
    },
    answers: {
        padding: theme.spacing(1)
    },
    answer: {
        height: theme.spacing(10),
        display: 'flex',
        flexDirection:'row',
        alignItems : 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: 'red',
        borderRadius: theme.spacing(0.5),
        boxShadow: `1px 3px 1px #f0f0f0`,
    }
}))
const Answer = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.answer}>
            <Square sx ={{ fontSize: 30, color: 'white'}}/>
            <Typography variant = 'h6' sx = {{flex: 1, ml: theme.spacing(2), fontWeight: 'bold', color: 'white'}}>Lorem ipsum dodis excepturi esse</Typography>
        </div>
    )
}

const Question = (props) => {
    const classes = useStyles()

    return (
        <div className = {classes.container}>
            <div className = {classes.titleContainer} >
                <Typography variant = 'h6'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi omnis recusandae dicta culpa sequi. Laborum praesentium corpor?
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.timerContainer} >
                    <Typography variant = 'h3' sx = {{fontWeight: 'bold'}}>46</Typography>
                </div>
                <img className = {classes.img} src = 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQyg88kimEj5cTPQwl81-F6lHFaDhcBl6beaRZ4Erpl_fyd9G6JrqU7qsPgb-WRAKzIHTWs-mDPjvss0rFkpaI'/>
            </div>
            <div className = {classes.answers} >
                <Grid container columnSpacing = {1} rowSpacing = {1}>
                    {
                        Array.from(Array(4)).map((_, index) => (
                            <Grid item xs = {6} >
                                <Answer/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default Question
