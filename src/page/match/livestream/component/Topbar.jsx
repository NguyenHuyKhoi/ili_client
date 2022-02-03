import { AppBar, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../../asset/image/logo.png'
import Button from '../../../../component/Button'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: 'white'
    },
    logo: {
        height: theme.spacing(6),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    settingBox: {
        display: 'flex',
        width: theme.spacing(40),
        justifyContent:'space-between',
        border: 'solid 1px #000000',
        borderRadius: '255px 10px 225px 10px/10px 225px 10px 255px',
        flexDirection:'row',
        marginLeft: theme.spacing(2),
        padding: theme.spacing(0.4),
        alignItems: 'center',
    },
    title: {
        color: 'gray'
    },
    button: {
        marginLeft: theme.spacing(3)
    }
}))

const BTN_STYLES = [
    { variant: 'success',  label: 'Go live'},
    { variant: 'primary',  label: 'Preparing...'},
    { variant: 'primary',  label: 'Ready to live ...'},
    { variant: 'error',  label: 'End live'},
    { variant: 'success',  label: 'Exit'},
]

const Topbar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {fbUrl} = props
    const {match, livestreamStage} = useContext(MatchPlayContext)
    const {title} = match

    const btnStyle = BTN_STYLES[livestreamStage ? livestreamStage : 0]
    return (
        <AppBar position = 'fixed'>
            <Toolbar className = {classes.toolbar}>
                <div onClick = {() => navigate('/', {replace: true})}>
                    <img src = {logo} className = {classes.logo} alt = 'Logo'/>
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
                            title === '' || title == null ?
                            'Enter name ...'
                            :
                            title
                        }
                     
                    </Typography>
                    <Button 
                        variant= "success" 
                        size = "small" 
                        style = {{ marginLeft: theme.spacing(3)}}
                        label = 'Setting'/>
                </div>
                <div style = {{flex:1}}/> 
                {
                    fbUrl && 
                    <div onClick = {() => {
                        if (props.onOpenLink) props.onOpenLink()
                    }}>
                        <Typography variant='label' sx = {{color: '#000', mx : theme.spacing(2)}}>
                            View and set public video on : 
                        <a href={fbUrl} 
                            target="_blank" rel="noopener noreferrer" 
                                    style = {{'&:hover': {
                                        cursor: 'pointer'
                                    }}}>Here</a>
                        </Typography>
                    </div>

                }
                <Button 
                    variant = {btnStyle.variant}
                    size = 'small'
                    style = {{ 
                        marginLeft: theme.spacing(3),
                        width: theme.spacing(25),
                    }}
                    onClick = {() => {
                        if (props.onClickBtn) props.onClickBtn()
                    }}
                   label = {btnStyle.label} />
            </Toolbar>
        </AppBar>
    )
}

export default Topbar
