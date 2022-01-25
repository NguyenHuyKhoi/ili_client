import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection:'row',
        borderRadius: theme.spacing(0.5),
        alignSelf:'baseline',
    },
    item: {
        flex: 1,
        padding: theme.spacing(0.8),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
        '&:hover': {
            cursor: 'pointer'
        }
    }   
}))


const TabItem = (props) => {
    const classes = useStyles()
    const handleClick = () => {
        if (props.handleItemClick !== undefined) {
            props.handleItemClick()
        }
    }

    var primary = theme.palette.primary.main
    return (
        <div className = {classes.item} 
            onClick = {handleClick} 
            style = {{
                border:'solid 2px #000000',
                backgroundColor: props.isSelected ? primary: 'rgba(0,0,0,0)'
            }}>
            <Typography variant = 'label' 
                style= {{ color: '#000000'}}>
                    {props.title}
            </Typography>
        </div>
    )
}
const Tabbar = (props) => {
    const classes = useStyles()

    let {tabs, selectedIndex} = props
    const handleItemClick = (index) => {

        if (props.onClickTab) {
            props.onClickTab(index)
        }
    }
    if (tabs ===undefined) tabs = []
    return (
        <div className = {classes.container}>
            {
                tabs.map((item, index) => (
                    <div className = {classes.tabContainer}   key = {''+index}>
                        <TabItem 
                            title ={item} 
                            handleItemClick = {() => handleItemClick(index)}
                            isSelected = {selectedIndex ===index}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Tabbar
