import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { createUrl } from '../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    banner: {
        width: '100%',
        height: 200,
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
        padding: 1,
        backgroundColor: 'white'
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
            <Typography variant = 'subtitle2' sx = {{color: '#5f5f5f'}} >
                {label}
            </Typography>
            <Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}} > 
                {value}
            </Typography>
        </div>
    )
}

const ProfileHeader = (props) => {
    const classes = useStyles()
    const {user} = props

    const {username, avatar, banner} = user
    return (
        <div className = {classes.container}>
            <img className = {classes.banner} 
                src = {createUrl(banner)}/>
            <div className = {classes.body}>
                <img className = {classes.avatar} alt="Remy Sharp" 
                    src={createUrl(avatar)}/>
                <div className = {classes.inforLeft}>
                    <Typography variant = 'h5' sx = {{fontWeight: 'semi-bold', color: '#333333'}}>  
                        {username}
                    </Typography>
                    <Typography variant = 'h6'> . </Typography>
                </div>
                <div className = {classes.inforRight}>
                    <InforItem label = {'Games'} value = {120} />
                    <InforItem label = {'Collections'} value = {12} />
                    <InforItem label = {'Matches'} value = {12}/>
                </div>
                <Button size = 'large' variant = 'contained' color = 'primary'
                    sx = {{fontWeight: 'bold', textTransform: 'none', color: 'white', width: 160}}>
                    Follow
                </Button>

            </div>
        </div>
    )
}

export default ProfileHeader
