import { ExpandLess, ExpandMore, Inbox } from '@mui/icons-material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { makeStyles } from '@mui/styles'
import React from 'react'
const useStyles = makeStyles((theme) => ({
}))
export const DropdownMenu = (props) => {
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
                    <Inbox />
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
