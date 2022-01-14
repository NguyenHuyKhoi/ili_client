import { Add } from '@mui/icons-material'
import { Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
import Icon from '../../../../component/Icon'
import { theme } from '../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingTop: theme.spacing(5),
        padding: theme.spacing(2),
        
    },
    item: {
        display: 'flex',
        width: '100%',
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'

    }
}))

const MenuItem = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {menu, isSelected} = props
    const {title, link, icon} = menu
    const handleClick = () => {
        return navigate(link, {replace: true})
    }
    return (
        <div className = {classes.item} 
            onClick = {handleClick}>
            {
                isSelected ? 
                <Button
                    style = {{width: '100%'}}
                    variant = 'primary'
                    label = {title}
                    size = 'small'/>
                : 
                <Typography variant = 'btnLabel' sx = {{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}>
                    {title}
                </Typography>
            }
        </div>
    )
}

const menus = [
    {
        link: '/game/library',
        title: 'Games',
        icon: 'TableRows'
    },
    {
        link: '/collection/library',
        title: 'Collections',
        icon: 'SnippetFolder'
    },
]

const SideMenu = (props) => {
    const classes = useStyles()
    const {selectedIndex} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.itemContainer}>
                {
                    menus.map((menu, index) => (
                        <MenuItem
                            menu = {menu}
                            isSelected = {selectedIndex == index}
                            key = {"" + index}/>
                    ))
                }
             
            </div>

        </div>
    )
}

export default SideMenu
