import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { createUrl } from '../../../../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: theme.spacing(0.4),
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
        padding: theme.spacing(1),
        backgroundColor: 'white',
    },  
    rank: {
        position: 'absolute',
        bottom: theme.spacing(1.2),
        right: theme.spacing(1.5),
        padding: theme.spacing(0.4),
        paddingLeft: theme.spacing(0.6),
        paddingRight: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 99
    },
    img: {
        height: theme.spacing(10),
        aspectRatio: 1,
        borderRadius: 5,
        alignSelf:'center',
        marginRight: theme.spacing(1)
    }
}))

const PlayerRowItem = (props) => {
    const classes = useStyles()
    var {player} = props
    const {username, avatar, score, rank } = player

    return (
        <div className = {classes.container} 
            onClick = {() => {
                console.log("Select question ")
                if (props.onSelect) props.onSelect()
            }}>
            
            <div className = {classes.infor}>
                <Typography variant = 'bigLabel' sx = {{color: '#000'}}>
                    { score}
                </Typography>
                <Typography variant = 'btnLabel' sx = {{color: '#000'}}>
                    { username}
                </Typography>
            </div>
            <img className = {classes.img} src = {createUrl(avatar)} alt = 'Avatar'/>
            <div className = {classes.rank}>
                <Typography variant = 'caption' sx = {{color: 'white'}}>
                    {'Rank: ' + rank}
                </Typography>
            </div>
        </div>
    )
}
export default PlayerRowItem
