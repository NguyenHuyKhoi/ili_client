import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { GameCreatorContext } from '../../../../context/game/creator/context'
import { theme } from '../../../../theme'
import logo from '../../../../asset/image/logo.png'
import { useNavigate } from 'react-router-dom'
import { MatchLivestreamContext } from '../../../../context/match/livestream/context'
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: 'white'
    },
    logo: {
        width: 80,
        height:30
    },
    settingBox: {
        display: 'flex',
        width: theme.spacing(40),
        height: 25,
        justifyContent:'space-between',
        flexDirection:'row',
        marginLeft: theme.spacing(2),
        border: '1px solid #f2f2f2',
        padding: theme.spacing(1),
        alignItems: 'center',
        borderRadius: theme.spacing(1)
    },
    title: {
        color: 'gray'
    },
    button: {
        marginLeft: theme.spacing(3)
    }
}))

const Topbar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {dispatch, match} = useContext(MatchLivestreamContext)
    const {title} = match
    return (
        <AppBar position = 'fixed'>
            <Toolbar className = {classes.toolbar}>
                <div onClick = {() => navigate('/', {replace: false})}>
                    <img src = {logo} className = {classes.logo}/>
                </div>
                <div className = {classes.settingBox} 
                    onClick = {() => {
                        if (props.onSetting) {
                            props.onSetting()
                        }
                    }}
                
                >
                    <Typography variant='subtitle1' className = {classes.title}> 
                        {
                            title == '' || title == null ?
                            'Enter name ...'
                            :
                            title
                        }
                     
                    </Typography>
                    <Button 
                        variant="contained" size = "small" 
                        color = "neutral" 
                        sx = {{ marginLeft: theme.spacing(3),color: '#333333', fontWeight: 'bold', textTransform: 'none'}}>Setting</Button>
                </div>
                <div style = {{flex:1}}/> 
                <Button variant="contained" 
                    color = "primary"  
                    sx = {{ 
                        marginLeft: theme.spacing(3),color: 'white', fontWeight: 'bold',
                        width: theme.spacing(25),
                    }}
                    onClick = {() => {
                        if (props.onLive) props.onLive()
                    }}
                    >
                    Go live
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar
