import { Check, Close, Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        height: theme.spacing(10),
        display: 'flex',
        flexDirection:'column',
        alignItems : 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: 'red',
        borderRadius: theme.spacing(0.5),
        boxShadow: `1px 3px 1px #f0f0f0`,
    }
}))

const KeywordPlayer= (props) => {
    const classes = useStyles()
    var {player} = props 

    return (
        <div style = {{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#CDDCDC',
            padding: theme.spacing(0.6)
        }}>
            {
                player != null ?
                <img style = {{
                    height: theme.spacing(6),
                    aspectRatio: 1
                }} src = {player.avatar}/>
                :
                <div style = {{
                    height: theme.spacing(6),
                    aspectRatio: 1
                }}/>
            }
         
            <Typography variant = 'btnLabel' sx = {{color: '#000',flex: 1, mx: theme.spacing(2)}}>
                {player!=null ? player.username : '' }
            </Typography>
            <Typography variant = 'bigLabel' sx = {{color: '#000', mr: theme.spacing(2)}}>
                {player!=null ? `+ ${player.score}` : '' }
            </Typography>
        </div>  
    )
}

const KeywordPlayerList = (props) => {
    const classes = useStyles()
    const {userAnswers} = props 

    const players = []
    userAnswers.forEach((item, index) => {
        if (item.keywordIndex != undefined) {
            var idx = players.findIndex((player) => player._id == item._id)
            if (idx != -1) {
                players[idx].score = players[idx].score + item.earnScore
            }
            else {
                players.push({
                    _id: item._id,
                    username: item.username,
                    avatar: item.avatar, 
                    score: item.earnScore
                })
            }
        }
    })

    players.sort((a,b) => {
        if (a.score >= b.score) return -1
        return 1
    })
    return (
        <div style = {{
            width: '100%',
            padding: theme.spacing(5)
        }}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                {
                    Array.from(Array(10)).map((_, index) => (
                        <Grid item xs = {6} key = {'' + index}>
                            <KeywordPlayer player = {index < players.length && index < 10 ? players[index] : null}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>  
    )
}

export default KeywordPlayerList
