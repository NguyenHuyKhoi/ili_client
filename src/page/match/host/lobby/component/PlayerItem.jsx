import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
 
const useStyles = makeStyles((theme) => ({
    container: {
        width: theme.spacing(26),
        height: theme.spacing(20),
        backgroundColor: theme.palette.info.main,
        border: 'solid 2px #000000',
        borderRadius: '255px 5px 225px 5px/5px 225px 5px 255px',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    body: {
        display: 'flex',
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        borderRadius: theme.spacing(3.5),
        objectFit: 'cover'
    },
    point: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
}))
export const PlayerItem = (props) => {
    const classes = useStyles()
    var {player, disable, isMe, style} = props
    const {username, score, userId, avatar} = player
    const isGuess = userId == null 
    console.log("Is me: ", isMe, player._id)
    return (
        <div className = {classes.container}
            onClick = {() => { 
                if (disable) return 
                if (props.onKick) props.onKick() }}
            style = {style ?  style : {}}>   

            <Typography variant = 'label' sx = {{
                color: '#000', width: '100%', textAlign: 'center',
                borderBottom: `solid 2px #000`}}
                >
                {isGuess ? 'Guess' : 'Member'}
            </Typography>
            <div className = {classes.body}>
                <img src = {createUrl(avatar)} className = {classes.avatar} alt = 'Avatar'/>
                <div className = {classes.point}>
                    <Typography variant = 'header' sx = {{color: '#000', fontSize: 40}}>
                        {score}
                    </Typography>
                    <Typography variant = 'label' sx = {{color: '#000'}}>
                        Points
                    </Typography>
                </div>
            </div>
            <Typography variant = 'btnLabel' 
                sx = {{
                    color: '#000', textAlign: 'center', 
                    width: '100%',
                    borderTop: `solid 2px #000`,
                    backgroundColor: isMe ? theme.palette.success.main : 'rgba(0,0,0,0)',
                    '&:hover': {
                        textDecoration: disable ? 'none' : 'line-through'
                    }}}>
                {username}
            </Typography>
        </div>
    )
}

export default PlayerItem
