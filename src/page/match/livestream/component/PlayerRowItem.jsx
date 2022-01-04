import { Check, Close } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import Icon from '../../../../component/Icon'
import { theme } from '../../../../theme'
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
        opacity: 0.8,
        zIndex: 99
    },
    img: {
        height: 60,
        aspectRatio: 1,
        borderRadius: 5,
        alignSelf:'center',
        marginRight: theme.spacing(1)
    }
}))

const PlayerRowItem = (props) => {
    const classes = useStyles()
    var {player, index} = props
    player = {
        name: 'username',
        score: 1203,
        rank: 1
    }
    const {name, score, rank } = player

    return (
        <div className = {classes.container} 
            onClick = {() => {
                console.log("Select question ")
                if (props.onSelect) props.onSelect()
            }}>
            
            <div className = {classes.infor}>
                <Typography variant = 'subtitle1'>
                    {score}
                </Typography>
                <Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}}>
                    {name}
                </Typography>
            </div>
            <img className = {classes.img} src = {'https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg'}/>
            <div className = {classes.rank}>
                <Typography variant = 'caption' sx = {{color: 'white'}}>
                    {rank}
                </Typography>
            </div>
        </div>
    )
}
export default PlayerRowItem
