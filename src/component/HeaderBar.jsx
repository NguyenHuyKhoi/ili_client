import { HomeOutlined, Logout, NotificationsOutlined } from '@mui/icons-material'
import { Avatar, Button, Popover, Typography } from '@mui/material'
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
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '1px 3px 1px #f2f2f2',
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight:  theme.spacing(2)
    },
    logo: {
        height: theme.spacing(5),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    avatarPopover: {
        display: 'flex',
        width: 300,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(2)
    },
    avatarPopoverHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatarPopoverFooter: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center'
    }
}))

const AvatarPopover = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {dispatch, user, token} = useContext(AuthContext)

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

    const handleClickSettings = () => {
        navigate('/user/setting', {replace: false})
    }
    return (
        <div className = {classes.avatarPopover}>
            <div className = {classes.avatarPopoverHeader}>
                <Typography variant = 'subtitl1'>
                    User name
                </Typography>
                <Typography variant = 'caption'>
                    View profile    
                </Typography>
            </div>
            <DropdownMenu menu = {{
                title: 'Change Language'
            }}
            />
              <DropdownMenu menu = {{
                title: 'Subscriptions',
                items: [
                    'Ili AccessPass'
                ]
            }}/>
            <DropdownMenu menu = {{
                title: 'Profile Settings'
            }}
                onClick = {handleClickSettings}/>
            <DropdownMenu menu = {{
                title: 'Resources',
                items: [
                    'Help & Support Center',
                    'Blog',
                    'Library',
                    'Certification',
                    'Shop'
                ]
            }}/>
            <div className = {classes.avatarPopoverFooter} onClick = {handleLogout}>
                <Logout sx = {{color: 'red', fontSize: 20}}/>
                <Typography variant = 'subtitle2' sx = {{mx: theme.spacing(1),color: 'red'}}>
                    Sign out
                </Typography>
            </div>
        </div>
    )
}

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

const HeaderBar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {dispatch} = useContext(GameCreatorContext)
    const {user} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {selectedIndex} = props 
    const {avatar} = user 
    const handleClickAvatar = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
            <Button variant = 'contained' onClick = {handleCreate}
                sx = {{fontWeight: 'bold', textTransform: 'none', color: 'white'}}>
                Create
            </Button>
            <Avatar sx = {{mx: theme.spacing(2), width: 30, height: 30}} 
                src = {createUrl(avatar)}
                onClick = {handleClickAvatar}/>
            <Popover
                id = {id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                >
                <AvatarPopover/>
            </Popover>
            <NotificationsOutlined sx = {{fontSize: 25}}/>
        </div>
    )
}

export default HeaderBar
