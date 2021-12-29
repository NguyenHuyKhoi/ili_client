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
        height: theme.spacing(10),
        display: 'flex',
        flexDirection:'row',
        alignItems : 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: 'red',
        borderRadius: theme.spacing(0.5),
        boxShadow: `1px 3px 1px #f0f0f0`,
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))

const Answer = (props) => {
    const classes = useStyles()
    const {answer, isCorrect, isSelected, style} = props 
    const {color, icon} = style
    return (
        <div className = {classes.container} 
            style={{backgroundColor: color, opacity: isCorrect == false || isSelected == false ? 0.5 : 1}}
            onClick = {() => {
                if (props.onClick) props.onClick()
            }}>
            <Icon name = {icon} style = {{fontSize: 30, color: 'white'}}/>
            <Typography variant = 'h5' sx = {{flex: 1, ml: theme.spacing(2), fontWeight: 'bold', color: 'white'}}>
                {answer}
            </Typography>
            {
                isCorrect != undefined && 
                (
                    isCorrect ?
                    <Check sx = {{color: 'white', fontSize: 40}}/>
                    : 
                    <Close sx = {{color: 'white', fontSize: 40}}/>
                )
            }
            {
                isSelected == true && 
                <Check sx = {{color: 'white', fontSize: 40}}/>
            }
        </div>
    )
}


export default Answer
