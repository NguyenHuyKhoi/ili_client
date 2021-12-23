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
        height: 250,
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
    return (
        <div className = {classes.inforItem}>
            <Typography variant = 'subtitle2' >Plays</Typography>
            <Typography variant = 'subtitle1' sx = {{fontWeight: 'bold'}} > 134 </Typography>
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
                    <Typography variant = 'h6'> 
                        {username}
                    </Typography>
                    <Typography variant = 'h6'> . </Typography>
                </div>
                <div className = {classes.inforRight}>
                    <InforItem/>
                    <InforItem/>
                    <InforItem/>
                </div>
                <Button size = 'large' variant = 'contained' color = 'primary'>Follow</Button>

            </div>
        </div>
    )
}

export default ProfileHeader
