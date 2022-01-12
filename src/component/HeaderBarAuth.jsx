import { HomeOutlined, Logout, NotificationsOutlined } from '@mui/icons-material'
import { Avatar, Popover, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutSuccess } from '../context/auth/actions'
import { AuthContext } from '../context/auth/context'
import { startCreateGame } from '../context/game/creator/actions'
import { GameCreatorContext } from '../context/game/creator/context'
import { theme } from '../theme'
import { DropdownMenu } from './DropdownMenu'
import Tabbar from './Tabbar'
import {createUrl} from '../util/helper'
import HeaderTabs from './Tabbar'
import logo from '../asset/image/logo.png'
import Button from './Button'
import IconButton from './IconButton'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '1px 3px 1px #f2f2f2',
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight:  theme.spacing(2),
        height : theme.spacing(7)
    },
    logo: {
        height: theme.spacing(5),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}))


const tabs = [
    {
        label: 'Home',
        link: '/',
        icon: 'Home'
    },
    {
        label: 'Discover',
        link: '/discover/suggestion',
        icon: 'ExploreOutlined'
    },
    {
        label: 'Library',
        link: '/game/library',
        icon: 'TocOutlined'
    },
    {
        label: 'Report',
        link: '/report',
        icon: 'BarChartOutlined'
    }
]

const HeaderBarAuth = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {dispatch} = useContext(GameCreatorContext)
    const {user, token} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {selectedIndex} = props 
    const {avatar} = user 
      
    const handleLogout = (e) => {
        e.preventDefault()
        axios.post('auth/logout', null, {
                headers: {
                    'x-access-token': token
                }
            })
        .then((res) => {
            dispatch(logoutSuccess())
        })   
    }
    
    const handleGoProfile = () => {
            return navigate(`/profiles/${user._id}`, {replace: false})
    }


    const handleCreate = () => {
        dispatch(startCreateGame())
        navigate('/game/creator',{replace: true})
    }
    return (
        <div className = {classes.container}>
            <div onClick = {() => navigate('/', {replace: false})}>
                <img src = {logo} className = {classes.logo}/>
            </div>
            
            <Tabbar tabs = {tabs} selectedIndex = {selectedIndex}/>
            <Button 
                size = 'small'
                variant = 'success'
                label = 'Create Game'
                onClick = {handleCreate}/>
            <IconButton 
                icon = 'Person'
                size = 'small'
                variant = 'primary'
                style = {{marginLeft: theme.spacing(3), marginRight: theme.spacing(3)}}
                onClick = {handleGoProfile}/>
            <IconButton 
                icon = 'Logout'
                size = 'small'
                variant = 'error'
                onClick = {handleLogout}/>
        </div>
    )
}

export default HeaderBarAuth
