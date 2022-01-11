import {Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Button from '../../../../component/Button'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    banner: {
        width: '100%',
        height: theme.spacing(30),
        objectFit: 'cover'
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: 'white',
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        position: 'relative'
    },
    avatar: {
        position: 'absolute',
        width: theme.spacing(16),
        height: theme.spacing(16),
        borderRadius: theme.spacing(8),
        top: theme.spacing(-8),
        left: theme.spacing(10),
        padding: 2,
        backgroundColor: theme.palette.primary.main
    },
    inforLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft:theme.spacing(20),
        marginRight: theme.spacing(3)
    },
    inforRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: theme.spacing(3)
    },
    inforItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}))
const InforItem = (props) => {
    const classes = useStyles()
    const {label, value} = props 
    return (
        <div className = {classes.inforItem}>
            <Typography variant = 'label' sx = {{color: '#5f5f5f'}} >
                {label}
            </Typography>
            <Typography variant = 'bigLabel' sx = {{fontWeight: 'bold', color: '#333333'}} > 
                {value}
            </Typography>
        </div>
    )
}

const ProfileHeader = (props) => {
    const classes = useStyles()
    const {user} = props

    var {name, avatar, banner} = user
    name = 'User name'

    const handleFollow = () => {

    }
    return (
        <div className = {classes.container}>
            <img className = {classes.banner} 
                src = {createUrl(banner)}/>
            <div className = {classes.body}>
                <img className = {classes.avatar}
                    src={createUrl(banner)}/>
                <div className = {classes.inforLeft}>
                    <Typography variant = 'header' sx = {{fontWeight: 'bold', color: '#333333'}}>  
                        {name}
                    </Typography>
                </div>
                <div className = {classes.inforRight}>
                    <InforItem label = {'Games'} value = {120} />
                    <InforItem label = {'Collections'} value = {12} />
                    <InforItem label = {'Matches'} value = {12}/>
                </div>

                <Button 
                    size = 'medium'
                    label = 'FOLLOW'
                    variant = 'secondary'
                    style = {{width: theme.spacing(25)}}
                    onClick = {handleFollow}/>
              

            </div>
        </div>
    )
}

export default ProfileHeader
