import { Avatar, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'

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
    const classes = useStyles()
    const handleClick = () => {
        navigate('/user/profile', {replace: false})
    }
    return (
        <div className = {classes.container} onClick={handleClick}>
            <Avatar alt="Remy Sharp" src="../../../asset/image/logo.jpg"/>
            <div className ={classes.infor}>
                <Link href="#" underline="hover" color = {'black'}>
                    Game Owner
                </Link>
                <Typography variant = 'subtitle2'>
                    Update 1 hour ago
                </Typography>
            </div>
        </div>
    )
}

export default OwnerInfor
