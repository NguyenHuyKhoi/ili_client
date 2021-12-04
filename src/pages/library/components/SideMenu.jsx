import { Add, ClassSharp } from '@mui/icons-material'
import { AppBar, Avatar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import logo from '../../../assets/images/logo.jpg'
import { theme } from '../../../theme'

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
    const handleClick = () => {
        if (props.onItemClick != undefined) {
            props.onItemClick()
        }
    }
    return (
        <div className = {classes.item} style = {{
            backgroundColor: props.isSelected? 'gray':'white'
        }}
            onClick = {handleClick}
        >
            <Add sx = {{color: props.isSelected? 'violet':'gray'}} />
            <Typography variant = 'subtitle1' sx = {{ml: theme.spacing(1), color: props.isSelected? 'violet':'gray'}}>
                {props.title}
            </Typography>
        </div>
    )
}

const GameInfor = (props) => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const handleItemClick = (index) => {
        setSelectedIndex(index)
    }
    return (
        <div className = {classes.container}>
            {
                ['Games','Courses'].map((item,index) => (
                    <div className = {classes.itemContainer}>
                        <MenuItem onItemClick = {() => handleItemClick(index)} title = {item} isSelected = {selectedIndex == index}/>
                    </div>
                ))
            }

        </div>
    )
}

export default GameInfor
