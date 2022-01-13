import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../theme'
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
        padding: theme.spacing(0.7),
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


    var primary = theme.palette.primary.main
    var warning = theme.palette.warning.main
    return (
        <div className = {classes.item}
            onClick = {handleClick}
            style ={{
                borderBottom: isSelected ?
                    `3px solid ${primary}` : null
            }}>
            {/* <HomeOutlined sx = {{
                color: isSelected ? '#46178f':'gray'
            }}/> */}
            <Icon name = {icon} style = {{ color: isSelected ? primary : '#000'}}/>
            <Typography variant = 'btnLabel' 
                sx = {{ml: theme.spacing(1.5),
                    color: isSelected ? primary : '#000'}}>
                {label}
            </Typography>
        </div> 
    )
}

const Tabbar = (props) => {
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
