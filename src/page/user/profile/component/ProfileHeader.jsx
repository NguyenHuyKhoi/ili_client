import {Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
import { AuthContext } from '../../../../context/auth/context'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    banner: {
        width: '100%',
        height: theme.spacing(25),
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
    const navigate = useNavigate()
    const classes = useStyles()
    const {user} = props

    const me = useContext(AuthContext).user
    var {avatar, banner, username} = user

    const handleFollow = () => {

    }

    const handleGoSetting = () => {
        return navigate('/user/setting', {replace: true})
    }
    
    const isMe = me != null && me._id == user._id
    return (
        <div className = {classes.container}>
            <img className = {classes.banner} 
                src = {createUrl(banner)}/>
            <div className = {classes.body}>
                <img className = {classes.avatar}
                    src={createUrl(banner)}/>
                <div className = {classes.inforLeft}>
                    <Typography variant = 'header' sx = {{fontWeight: 'bold', color: '#000'}}>  
                        {username}
                    </Typography>
                </div>
                <div className = {classes.inforRight}>
                    <InforItem label = {'Games'} value = {120} />
                    <InforItem label = {'Collections'} value = {12} />
                    <InforItem label = {'Matches'} value = {12}/>
                </div>

                <Button 
                    size = 'medium'
                    label = {isMe ? 'SETTING' : 'FOLLOW'}
                    variant = 'secondary'
                    style = {{width: theme.spacing(25)}}
                    onClick = {isMe ? handleGoSetting : handleFollow}/>
              

            </div>
        </div>
    )
}

export default ProfileHeader
