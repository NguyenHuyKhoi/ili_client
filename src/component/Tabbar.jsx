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
import { Icon } from './Icon'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1.2),
        alignItems: 'center',
        marginLeft: theme.spacing(1.5)
    }
}))

export const TabItem = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {isSelected, tab} = props
    const {icon, label, link} = tab
    const handleClick = () => {
        navigate(link, {replace: true})
    }

    return (
        <div className = {classes.item}
            onClick = {handleClick}
            style ={{
                borderBottom: isSelected ?
                    '3px solid #46178f' : null
            }}>
            {/* <HomeOutlined sx = {{
                color: isSelected ? '#46178f':'gray'
            }}/> */}
            <Icon name = {icon} style = {{ color: isSelected ? '#46178f':'gray'}}/>
            <Typography variant = 'subtitle1' 
                sx = {{ml: theme.spacing(1.5),
                    color: isSelected ? '#46178f':'#333333'}}>
                {label}
            </Typography>
        </div> 
    )
}

const Tabbar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {selectedIndex, tabs} = props

    console.log("Tabs: ", tabs)
    return (
        <div className = {classes.container}>
            {
                tabs.map((item, index) => (
                    <TabItem isSelected = {selectedIndex == index}
                        key = {''+index}
                        tab = {item}/>
                ))
            }
        </div>

    )
}

export default Tabbar
