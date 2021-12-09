import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Title } from './QuestionBuilder'
import logoImg from '../../../assets/images/logo.jpg'
import { TheaterComedyTwoTone } from '@mui/icons-material'
import { theme } from '../../../theme'
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: 'white'
    },
    logoSm: {
        width: 100,
        height:45
    },
    settingBox: {
        display: 'flex',
        width: theme.spacing(40),
        justifyContent:'space-between',
        flexDirection:'row',
        marginLeft: theme.spacing(2),
        border: '1px solid gray',
        padding: theme.spacing(1),
        alignItems: 'center'
    },
    title: {
        color: 'gray'
    },
    button: {
        marginLeft: theme.spacing(3)
    }
}))

const Topbar = (props) => {
    const classes = useStyles()
    const handleSetting = () => {
        if (props.onClickSetting != undefined) {
            props.onClickSetting()
        }
    }
    const handleExit = () => {
        if (props.onClickExit != undefined) {
            props.onClickExit()
        }
    }
    const handleSave = () => {
        if (props.onClickSave != undefined) {
            props.onClickSave()
        }
    }
    return (
        <AppBar position = 'fixed' sx = {{height: 60}}>
            <Toolbar className = {classes.toolbar}>
                <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png'} className = {classes.logoSm}/>
                <div className = {classes.settingBox} onClick = {handleSetting}>
                    <Typography variant='subtitle1' className = {classes.title}> Enter name ... </Typography>
                    <Button variant="contained" size = "small" color = "neutral" sx = {{ marginLeft: theme.spacing(3)}}>Setting</Button>
                </div>
                <div style = {{flex:1}}/> 
                <Button variant="contained" color = "neutral"  sx = {{ marginLeft: theme.spacing(3)}}
                    onClick = {handleExit}>Exit</Button>
                <Button variant="contained" color = "primary"  sx = {{ marginLeft: theme.spacing(3)}}
                    onClick = {handleSave}>Save</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar
