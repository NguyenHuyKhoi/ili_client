import { Avatar, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
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
            <Avatar alt="Remy Sharp" src={createUrl(avatar)}/>
            <div className ={classes.infor}>
                <Link href="" underline="hover" color = {'black'}>
                    {
                        username
                    }
                </Link>
                <Typography variant = 'subtitle2'>
                    Update 1 hour ago
                </Typography>
            </div>
        </div>
    )
}

export default OwnerInfor
