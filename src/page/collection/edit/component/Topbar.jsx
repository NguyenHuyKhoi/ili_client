import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CollectionContext } from '../../../../context/collection/context'
import { GameCreatorContext } from '../../../../context/game/creator/context'
import { theme } from '../../../../theme'
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
    const navigate = useNavigate()
    const classes = useStyles()
    const {collection} = useContext(CollectionContext)
    const {title} = collection
    return (
        <AppBar position = 'fixed' sx = {{height: 60}}>
            <Toolbar className = {classes.toolbar}>
                <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png'} className = {classes.logoSm}/>
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
                    <Button variant="contained" size = "small" color = "info" sx = {{ marginLeft: theme.spacing(3)}}>Setting</Button>
                </div>
                <div style = {{flex:1}}/> 
                <Button variant="contained" color = "neutral"  sx = {{ marginLeft: theme.spacing(3)}}
                    onClick = {() => {
                        navigate(-1)
                    }}
                    >Exit</Button>
                <Button variant="contained" color = "primary"  sx = {{ marginLeft: theme.spacing(3)}}
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
