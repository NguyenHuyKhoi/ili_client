import { Check, Close, Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Icon from '../../../../../component/Icon'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        width: theme.spacing(15),
        display: 'flex',
        flexDirection:'column',
        borderRadius: theme.spacing(1)
    },
    countDiv: {
    },
    body: {

        display: 'flex',
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'center',
        padding: theme.spacing(0.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderRadius: theme.spacing(0.5),
        '&:hover': {
            cursor: 'pointer'
        },
    }
}))

const AnswerCount = (props) => {
    const classes = useStyles()
    const { count, isCorrect, percent, style} = props 
    const {color, icon} = style
    console.log("AnswerCount :", 30 * (percent))
    return (
        <div className = {classes.container} 
            style={{backgroundColor: color}}
            onClick = {() => {
                if (props.onClick) props.onClick()
            }}>
            <div className = {classes.countDiv} 
                style = {{
                    backgroundColor: color,
                    margin: percent > 0 ? theme.spacing(0.2) : 0,
                    opacity: 1, 
                    height: theme.spacing(30 * (percent))}}/>
            <div className = {classes.body} >
                <Icon name = {icon} style = {{fontSize: 25, color: 'white'}}/>
                <Typography variant = 'h5' sx = {{mx: theme.spacing(1),color: 'white'}}>
                    {count}
                </Typography>
                {
                    isCorrect != undefined && 
                    (
                        isCorrect && 
                        <Check sx = {{color: 'white', fontSize: 25}}/>
                    )
                }
            </div>   
          
        </div>
    )
}


export default AnswerCount
