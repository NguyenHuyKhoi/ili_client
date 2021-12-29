import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CollectionContext } from '../../../../context/collection/context'
import { GameCreatorContext } from '../../../../context/game/creator/context'
import { theme } from '../../../../theme'
import logo from '../../../../asset/image/logo.png'
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: 'white'
    },
    logo: {
        width: 100,
        height:30
    },
    settingBox: {
        display: 'flex',
        width: theme.spacing(40),
        justifyContent:'space-between',
        flexDirection:'row',
        marginLeft: theme.spacing(2),
        border: '1px solid #f2f2f2',
        borderRadius: theme.spacing(0.4),   
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(1.5),
        alignItems: 'center'
    },
    button: {
        marginLeft: theme.spacing(3)
    }
}))

const Topbar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {collection} = useContext(CollectionContext)
    const {title} = collection
    return (
        <AppBar position = 'fixed' sx = {{height: 60}}>
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
                    <Typography variant='subtitle1' sx = {{color: '#333333', fontWeight: 'bold'}}> 
                        {
                            title == '' || title == null ?
                            'Enter name ...'
                            :
                            title
                        }
                     
                    </Typography>
                    <Button 
                        variant="contained" size = "small" color = "primary" 
                        sx = {{ marginLeft: theme.spacing(3), color: 'white', fontWeight: 'bold', textTransform: 'none'}}>
                        Setting
                        </Button>
                </div>
                <div style = {{flex:1}}/> 
                <Button variant="outlined" color = "neutral"  
                    sx = {{ marginLeft: theme.spacing(3),color: '#333333',borderColor: '#333333' ,fontWeight: 'bold', textTransform: 'none'}}
                    onClick = {() => {
                        navigate(-1)
                    }}
                    >Exit</Button>
                <Button variant="contained" color = "success" 
                    sx = {{ marginLeft: theme.spacing(3),color: 'white', fontWeight: 'bold', textTransform: 'none'}}
                    onClick = {() => {
                        if (props.onSave) props.onSave()
                    }}
                    >
                    Save
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar
