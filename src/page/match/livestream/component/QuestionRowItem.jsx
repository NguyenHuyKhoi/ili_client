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
    time_limit: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.4),
        paddingLeft: theme.spacing(0.6),
        paddingRight: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 99
    },
    img: {
        height: 60,
        aspectRatio: 1.6,
        alignSelf:'center'
    }
}))

const QuestionRowItem = (props) => {
    const classes = useStyles()
    const {question, index} = props
    const {title, image, answers, correct_answer, time_limit } = question

    return (
        <div className = {classes.container} 
            onClick = {() => {
                console.log("Select question ")
                if (props.onSelect) props.onSelect()
            }}>
            
            <div className = {classes.infor}>
                <Typography variant = 'subtitle1'>
                    {`${index + 1} - Quiz`}
                </Typography>
                <Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}}>
                    {title}
                </Typography>
            </div>
            <img className = {classes.img} src = {createUrl(image)}/>
            <div className = {classes.time_limit}>
                <Typography variant = 'caption' sx = {{color: 'white'}}>
                    {time_limit + ' sec'}
                </Typography>
            </div>
        </div>
    )
}
export default QuestionRowItem
