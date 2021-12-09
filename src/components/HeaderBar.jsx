import { Add, Home, HomeOutlined, Logout, NotificationsOutlined } from '@mui/icons-material'
import { AppBar, Avatar, Button, FormControl, InputLabel, Link, MenuItem, Popover, Select, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { theme } from '../theme'
import React, { useContext, useState } from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { AuthContext } from '../contexts/auth/context'
import { logout } from '../contexts/auth/apiCalls'
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
    const handleClick = () => {
      setOpen(!open);
    };
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
                <ListItemText primary={menu.title} />
                {menu.items == undefined? null:
                 open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        menu.items != undefined &&
                        menu.items.map((item, index) => (
                            <ListItemButton sx={{ pl: 4 }}>
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
    const {isSelected} = props
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
                Home
            </Typography>
        </div> 
    )
}

const AvatarPopover = () => {
    const classes = useStyles()
    const {dispatch} = useContext(AuthContext)
    const handleLogout = (e) => {
        e.preventDefault()
        logout(dispatch)
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
            }}/>
              <DropDownMenu menu = {{
                title: 'Subscriptions',
                items: [
                    'Kahoot AccessPass'
                ]
            }}/>
            <DropDownMenu menu = {{
                title: 'Settings',
                items: [
                    'Profile Settings',
                    'Upgrade'
                ]
            }}/>
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


const HeaderBar = () => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickAvatar = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleTabChange = (index) => {
        setSelectedIndex(index)
    }
    return (
        <div className = {classes.container}>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png'
                className = {classes.logo}/>
            <div className = {classes.menu}>
                {
                    Array.from(Array(5)).map((_, index) => (
                        <TabItem isSelected = {selectedIndex == index}
                            onClick = {()=>handleTabChange(index)}/>
                    ))
                }
            </div>
            <Button variant = 'contained'>
                <Link href = '/creator' underline = 'none' sx = {{color: 'white'}}>
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
