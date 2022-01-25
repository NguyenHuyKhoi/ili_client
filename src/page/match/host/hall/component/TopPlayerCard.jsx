import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import no_image from '../../../../../asset/image/logo.png'
import { theme } from '../../../../../theme'
import { createUrl } from '../../../../../util/helper'
var avatar_size = 16
var medal_size = 8

const medal_colors = [
    {
        color_1:'#FBC740',
        color_2:'#FEFF75'
    },
    {
        color_1: '#A8A9AD',
        color_2: '#D2D3D5'
    },
    {
        color_1: '#BFA865',
        color_2: '#ECCD7B'
    }
]
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        position: 'relative'
    },
    avatar: {
        objectFit: 'cover',
    },
    rank: {
        position: 'absolute',
        left: 0,
        right: 0, 
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const TopPlayerCard = (props) => {
    const classes = useStyles()
    const { player, index, style, isBig} = props 

    var {username, avatar, score} = player ? player : {username: ' --- ', avatar: null, score: ' --- '}

    const medal_color = medal_colors[index]

    var factor = 1
    if (isBig) factor = 1.5
    return (
        <div className = {classes.container} 
            onClick = {() => { }}
            style= {style ? style : {}}
            >
            <img src = {avatar != null? createUrl(avatar) : no_image}
                className = {classes.avatar}
                alt = 'Avatar'
                style = {{  
                    border: `4px solid ${medal_color.color_2}`,
                    width: theme.spacing(avatar_size* factor),
                    height: theme.spacing(avatar_size* factor),
                    borderRadius: theme.spacing(avatar_size/2* factor)}}/>
            <div className = {classes.rank}
                style = {{
                    top: theme.spacing(avatar_size * factor  - factor * medal_size / 2),
                    width: theme.spacing(medal_size * factor),
                    height: theme.spacing(medal_size * factor),
                    borderRadius: theme.spacing(medal_size/2 * factor),
                    backgroundColor: medal_color.color_1,
                    border: `10px solid ${medal_color.color_2}`
                }} >
                <Typography variant = 'header' 
                    sx = {{color: medal_color.color_2, fontWeight: 'bold'}}>
                    {index + 1}
                </Typography>
            </div>
            <Typography 
                variant = 'header' 
                sx = {{mt: theme.spacing(5 * factor), color: medal_color.color_2, fontWeight: 'bold', fontSize: 36}}>
                {username}
            </Typography>
            <Typography 
                variant = 'header' 
                sx = {{  color: medal_color.color_1}}>
                {score}
            </Typography>   
        </div>
    )
}


export default TopPlayerCard
