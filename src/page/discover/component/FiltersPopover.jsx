import { CheckBoxOutlineBlank, ChevronRight } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { SAMPLE_MENU } from '../../../context/sample_menu'
import { theme } from '../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        border: '1px solid gray',
        boxShadow: `1px 3px 1px #f0f0f0`,
        alignSelf: 'baseline',
        zIndex: 99
    },
    menus: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'baseline'
    },
    menuContainer: {

    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        width: theme.spacing(30),
        height: theme.spacing(35),
        borderRight: '1px solid gray',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    expandableItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(0.8),
        paddingLeft: theme.spacing(2),
        justifyContent: 'space-between'
    },
    selectableItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(0.8),
        paddingLeft: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2)
    }
}))

const ExpanableMenuItem = (props) => {
    const classes = useStyles()
    const {item} = props
    const {label, value} = item
    const handleHoverItem = () => {
        console.log("Listen hover item")
        if (props.onHover) {
            props.onHover()
        }
    }
    return (
        <div className= {classes.expandableItem} onMouseEnter={handleHoverItem}>
            <Typography variant= 'subtitle1' sx = {{fontWeight: 'bold', color: 'black'}}>
                {label}
            </Typography>
            <ChevronRight/>
        </div>
    )
}

const SelectableMenuItem = (props) => {
    const classes = useStyles()
    const {item} = props
    const {label, value} = item
    return (
        <div className= {classes.selectableItem}>
            <CheckBoxOutlineBlank/>
            <Typography variant= 'subtitle1' sx = {{ flex:1}}>
                {label}
            </Typography>
        </div>
    )
}
const Menu = (props) => {
    const classes = useStyles()
    const {menu} = props
    const {subitems} = menu
    const handleSelect = (item) => {
        if (props.onSelect) {
            props.onSelect(item)
        }
    }
    return (
        <div className= {classes.menu}>
            {
                subitems.map((item, index) => 
                (
                    item.subitems != undefined ?
                    <ExpanableMenuItem item = {item} onHover = {() => handleSelect(item)} key = {''+index}/>
                    :
                    <SelectableMenuItem item = {item}   key = {''+index}/>
                )
                )
            }
        </div>
    )
}
const FiltersPopover = (props) => {
    const classes = useStyles()
    const [menus, setMenus] = useState([])
    useEffect(() => {
        let arr = [{
            label: 'Filter',
            value: 'filter',
            subitems: [...SAMPLE_MENU]
        }]

        while (1) {
            let lastMenu = arr[arr.length - 1]
            if (lastMenu.subitems != undefined) {
                arr.push({...lastMenu.subitems[0]})
            }
            else {
                arr.pop()
                break
            }
        }
        setMenus([...arr])
        return () => {
            
        }
    }, [])


    const handleSelectItem = (subitem, menuIndex) => {
    }

    return (
        <div className= {classes.container}>
            <div className= {classes.menus}>
                {
                    menus.map((item, index) => (
                        <div className= {classes.menuContainer}   key = {''+index}>
                            <Menu menu = {item}
                                onSelect = {(subitem) => handleSelectItem (subitem, index)}/>
                        </div>
                    ))
                }
            </div>
            <div className= {classes.footer}>
                <Button variant = 'contained' >
                    Apply Filter
                </Button>
                <Button variant = 'contained'
                    sx = {{ml: theme.spacing(1)}} >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default FiltersPopover
