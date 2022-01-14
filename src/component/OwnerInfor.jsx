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
        flexDirection: 'row',
        alignItems: 'center',
    }
}))

export const OwnerInfor = (props) => {
    const navigate = useNavigate()
    const {owner} = props
    const {username, avatar, id} = owner
    const classes = useStyles()
    const handleViewProfile = (e) => {
        e.stopPropagation()
        navigate('/profiles/' + id , {replace: true})
    }
    return (
        <div className = {classes.container} >
            <div className ={classes.infor}>
                <Typography variant = 'label' sx = {{color: '#000'}}>
                    {'Owner:'}
                </Typography>
                <div onClick={handleViewProfile}>
                    <Typography variant = 'btnLabel' sx = {{color: '#000', fontWeight: 'bold', ml: theme.spacing(2),
                        '&:hover': {
                            cursor: 'pointer'
                        }}}>
                        {username}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default OwnerInfor
