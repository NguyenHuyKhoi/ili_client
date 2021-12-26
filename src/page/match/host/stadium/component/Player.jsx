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

const Player = (props) => {
    const classes = useStyles()
    const {player} = props 
    const {name, score} = player
    return (
        <div className = {classes.container} 
            onClick = {() => {
                if (props.onClick) props.onClick()
            }}>
            <Typography variant = 'h6' sx = {{flex: 1, ml: theme.spacing(2), fontWeight: 'bold', color: 'white'}}>
                {name}
            </Typography>
            
            <Typography variant = 'h6' sx = {{flex: 1, ml: theme.spacing(2), fontWeight: 'bold', color: 'white'}}>
                {'Score: ' + score}
            </Typography>
            
        </div>
    )
}


export default Player
