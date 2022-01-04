import { Add } from '@mui/icons-material'
import { Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Icon from '../../../../component/Icon'
import { theme } from '../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(5)
    },
    itemContainer: {
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
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
    const {menu, isSelected} = props
    const {title, link, icon} = menu
    const handleClick = () => {
        if (props.onItemClick != undefined) {
            props.onItemClick()
        }
    }
    return (
        <div className = {classes.item} style = {{
            backgroundColor: isSelected? '#F2F2F2':'white'
        }}
            onClick = {handleClick}
        >

            <Icon name = {icon} style = {{color: isSelected? '#46178F':'gray', fontSize: 20}} />
            <Link href={link} sx = {{ml: theme.spacing(1), color: isSelected? '#46178F':'#333333', fontWeight: 'bold'}}
                underline = 'none'>
                {title}
            </Link>
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
