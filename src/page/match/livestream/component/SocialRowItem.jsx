import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: theme.spacing(0.4),
        padding: theme.spacing(1),
        position: 'relative',
        border: '1px solid #1260BE',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    infor: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(1),
        backgroundColor: 'white',
    },  
    img: {
        height: theme.spacing(8),
        aspectRatio: 1,
        borderRadius: 5,
        alignSelf:'center',
        marginRight: theme.spacing(1),
        backgroundColor: 'rgba(0,0,0,0)'
    }
}))

const SocialRowItem = (props) => {
    const classes = useStyles()
    var {social, isSelected} = props
    var {avatar, name } = social

    return (
        <div className = {classes.container} 
            style = {{
                backgroundColor: isSelected ? theme.palette.secondary.main : '#fff'
            }}
            onClick = {() => {
                if (props.onSelect) props.onSelect()
            }}>
            
            <div className = {classes.infor}
                style = {{
                    backgroundColor: isSelected ? theme.palette.secondary.main : '#fff'
                }}>
                <Typography variant = 'btnLabel' sx = {{color: '#000'}}>
                    { name }
                </Typography>
            </div>
            <img className = {classes.img} src = {createUrl(avatar)} alt = 'Avatar'/>
        </div>
    )
}
export default SocialRowItem
