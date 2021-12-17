import { HomeOutlined, Logout, NotificationsOutlined } from '@mui/icons-material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Avatar, Button, Link, Popover, Typography } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../context/auth/apiCalls'
import { AuthContext } from '../context/auth/context'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
       // height: theme.spacing(7),
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight:  theme.spacing(2)
    },
    logo: {
        height: theme.spacing(5)
    },
    menu: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    tabItem: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1.5),
        alignItems: 'center',
        marginLeft: theme.spacing(1.5)
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
export const DropDownMenu = (props) => {
    // props.menu.title, items: [title]
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const {menu} = props
    if (menu == undefined) menu = {}

    const {title, items} = menu
    const handleClick = () => {
        if (items == undefined || items.length == 0) {
            if (props.onClick)  props.onClick()
            
        }
        else {
            setOpen(!open);
        }
    };

    const handleClickItem = () => {
        if (props.onClickItem)   props.onClickItem()
        
    }
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
                {
                    items == undefined? null:
                         open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        items != undefined &&
                        items.map((item, index) => (
                            <ListItemButton sx={{ pl: 4 }}  
                                key = {''+index}
                                onClick = {handleClickItem}>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Collapse>
        </List>
    )
}

export const TabItem = (props) => {
    const classes = useStyles()
    const {isSelected, label} = props
    const handleClick = () => {
        if (props.onClick != undefined) {
            props.onClick()
        }
    }
    return (
        <div className = {classes.tabItem}
            onClick = {handleClick}
            style ={{
                borderBottom: isSelected ?
                    '2px solid purple' : null
            }}>
            <HomeOutlined sx = {{
                color: isSelected ? 'purple':'gray'
            }}/>
            <Typography variant = 'subtitle1' 
                sx = {{ml: theme.spacing(1.5),
                    color: isSelected ? 'purple':'gray'}}>
                {label}
            </Typography>
        </div> 
    )
}

const AvatarPopover = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {dispatch, user} = useContext(AuthContext)
    const handleLogout = (e) => {
        e.preventDefault()
        logout(user, dispatch)
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
            <DropDownMenu menu = {{
                title: 'Change Language'
            }}
            />
              <DropDownMenu menu = {{
                title: 'Subscriptions',
                items: [
                    'Kahoot AccessPass'
                ]
            }}/>
            <DropDownMenu menu = {{
                title: 'Profile Settings'
            }}
                onClick = {handleClickSettings}/>
            <DropDownMenu menu = {{
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
    },
    {
        label: 'Discover',
        link: '/discover/suggestion'
    },
    {
        label: 'Library',
        link: '/game/library'
    },
    {
        label: 'Report',
        link: '/report'
    },
    {
        label: 'Groups',
        link: '/group/list'
    }
]

const HeaderBar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {selectedIndex} = props
    const handleClickAvatar = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleTabChange = (tab) => {
        navigate(tab.link, {replace: false})
    }
    return (
        <div className = {classes.container}>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png'
                className = {classes.logo}/>
            <div className = {classes.menu}>
                {
                    tabs.map((item, index) => (
                        <TabItem isSelected = {selectedIndex == index}
                            key = {''+index}
                            label = {item.label}
                            onClick = {()=>handleTabChange(tabs[index])}/>
                    ))
                }
            </div>
            <Button variant = 'contained'>
                <Link href = '/game/creator' underline = 'none' sx = {{color: 'white'}}>
                    Create
                </Link>
            </Button>
            <Avatar sx = {{mx: theme.spacing(2)}} 
                src = 'https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg'
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
