import { Add } from '@mui/icons-material'
import { Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column'
    },
    itemContainer: {
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(2),
        backgroundColor: 'white'
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),

    }
}))

const MenuItem = (props) => {
    const classes = useStyles()
    const {link, title, isSelected} = props
    const handleClick = () => {
        if (props.onItemClick != undefined) {
            props.onItemClick()
        }
    }
    return (
        <div className = {classes.item} style = {{
            backgroundColor: isSelected? 'gray':'white'
        }}
            onClick = {handleClick}
        >
            <Add sx = {{color: isSelected? 'violet':'gray'}} />
            <Link href={link} sx = {{ml: theme.spacing(1), color: isSelected? 'violet':'gray'}}
                underline = 'none'>
                {title}
            </Link>
        </div>
    )
}

const SideMenu = (props) => {
    const classes = useStyles()
    const {selectedIndex} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.itemContainer}>
                <MenuItem
                    link = {'/game/library'}
                    title = {'Game'} isSelected = {selectedIndex == 0}/>
            </div>
            <div className = {classes.itemContainer}>
                <MenuItem
                    link = {'/collection/library'}
                    title = {'Collection'} isSelected = {selectedIndex == 1}/>
            </div>

        </div>
    )
}

export default SideMenu
