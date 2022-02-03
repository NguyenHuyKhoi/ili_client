import { AppBar, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../../asset/image/logo.png'
import Button from '../../../../component/Button'
import { CollectionContext } from '../../../../context/collection/context'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: 'white',
        height: theme.spacing(8)
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
        flexDirection:'row',
        marginLeft: theme.spacing(2),
        border: '1px solid #000',
        borderRadius: theme.spacing(0.4),   
        padding: theme.spacing(0.2),
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
                    <Typography variant='label' sx = {{color: '#000', fontWeight: 'bold'}}> 
                        {
                            title === '' || title == null ?
                            'Enter name ...'
                            :
                            title
                        }
                     
                    </Typography>
                    <Button 
                        variant="primary"
                        size = 'small'
                        style = {{ marginLeft: theme.spacing(3)}}
                        label = 'Setting'/>
                </div>
                <div style = {{flex:1}}/> 

                <Button
                    variant="success" 
                    size = 'small'
                    style = {{ marginLeft: theme.spacing(2)}}
                    onClick = {() => {
                        if (props.onSave) props.onSave()
                    }}
                    label = 'Save'/>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar
