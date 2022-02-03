import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

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
    const {title, link} = menu
    const handleClick = () => {
        if (link) {
            return navigate(link, {replace: false})
        }
        else {
            if (props.onClick) {
                props.onClick()
            }
        }
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


const SideMenu = (props) => {
    const classes = useStyles()
    const {selectedIndex, menus} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.itemContainer}>
                {
                    menus.map((menu, index) => (
                        <MenuItem
                            menu = {menu}
                            isSelected = {selectedIndex === index}
                            onClick = {() => {
                                if (props.onSelectItem) props.onSelectItem(index)
                            }}
                            key = {"" + index}/>
                    ))
                }
             
            </div>

        </div>
    )
}

export default SideMenu
