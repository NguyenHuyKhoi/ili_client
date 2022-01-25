import { AppBar, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { GameCreatorContext } from '../../../../context/game/creator/context'
import { theme } from '../../../../theme'
import logo from '../../../../asset/image/logo.png'
import Button from '../../../../component/Button'
import { useNavigate } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: 'white',
        height: theme.spacing(8)
    },
    logo: {
        height: theme.spacing(6)
    },
    settingBox: {
        display: 'flex',
        width: theme.spacing(40),
        justifyContent:'space-between',
        flexDirection:'row',
        marginLeft: theme.spacing(2),
        padding: theme.spacing(0.2),
        paddingLeft: theme.spacing(1.5),
        alignItems: 'center',
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
    },
    title: {
        color: '#000'
    }
}))

const Topbar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {game} = useContext(GameCreatorContext)
    const {title} = game
    return (
        <AppBar position = 'fixed'>
            <Toolbar className = {classes.toolbar}>
                <div onClick = {() => navigate('/', {replace: true})}>
                    <img src = {logo} className = {classes.logo} alt = 'Logo' />
                </div>
                <div className = {classes.settingBox} 
                    onClick = {() => {
                        if (props.onSetting) {
                            props.onSetting()
                        }
                    }}
                
                >
                    <Typography variant='label' className = {classes.title}> 
                        {
                            title === '' || title == null ?
                            'Enter name ...'
                            :
                            title
                        }
                     
                    </Typography>
                    <Button 
                        variant="success" 
                        size = "small" 
                        style = {{ marginLeft: theme.spacing(3)}}
                        label = 'Setting'/>
                </div>
                <div style = {{flex:1}}/> 
                <Button 
                    variant="success" 
                    size = 'small'
                    style = {{ marginLeft: theme.spacing(5)}}
                    onClick = {() => {
                        if (props.onSave) props.onSave()
                    }}
                    label = 'Save'/>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar
