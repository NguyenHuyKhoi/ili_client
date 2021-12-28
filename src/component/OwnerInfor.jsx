import { Avatar, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../theme'
import { createUrl } from '../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infor: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(1)
    }
}))

export const OwnerInfor = (props) => {
    const navigate = useNavigate()
    const {owner} = props
    const {username, avatar, id} = owner
    const classes = useStyles()
    const handleViewProfile = (e) => {
        e.stopPropagation()
        navigate('/profiles/' + id , {replace: false})
    }
    return (
        <div className = {classes.container} onClick={handleViewProfile}>
            <Avatar alt="Remy Sharp" src={createUrl(avatar)} sx = {{width: theme.spacing(4), height: theme.spacing(4)}}/>
            <div className ={classes.infor}>
                <Typography variant = 'caption' sx = {{color: '#333333', fontWeight: 'bold'}}>
                    {username}
                </Typography>
                <Typography variant = 'caption' sx = {{color: '#5f5f5f'}}>
                    Update 1 hour ago
                </Typography>
            </div>
        </div>
    )
}

export default OwnerInfor
