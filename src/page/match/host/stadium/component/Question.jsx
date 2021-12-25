import { Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
import Answer from './Answer'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: grey[200],
        flexDirection: 'column',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(3)
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    },
    timer: {
        width: theme.spacing(14),
        height:  theme.spacing(14),
        borderRadius:  theme.spacing(7),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'violet',
        position: 'absolute',
        left: theme.spacing(2),
        top: 0,
        bottom: 0,
        margin: 'auto'
    },
    img: {
        width: 520,
        height: 260,
    },
    answers: {
        padding: theme.spacing(1)
    }
}))

const Question = (props) => {
    const classes = useStyles()
    const {question, time, answer_counts} = props
    const {title, image, answers, time_limit, correct_answers} = question
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'h6'>
                    {title}
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.timer} >
                    <Typography variant = 'h3' sx = {{fontWeight: 'bold'}}>
                        {time}
                    </Typography>
                </div>
                <img className = {classes.img} src = {createUrl(image)}/>
            </div>
            <div className = {classes.answers} >
                <Grid container columnSpacing = {1} rowSpacing = {1}>
                    {
                        answers.map((item, index) => (
                            <Grid item xs = {6}   key = {''+index}>
                                <Answer answer = {item} count = {answer_counts[index]}
                                    isCorrect = {correct_answers.indexOf(index) != -1}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default Question
