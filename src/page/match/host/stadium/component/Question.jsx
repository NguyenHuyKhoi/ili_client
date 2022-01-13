import { Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
import Answer from './Answer'
import {answerStyles} from '../../../../game/creator/component/Answers'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: 'column'
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7)
    },
    header: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.background.main,
    },
    img: {
        aspectRatio: 1.6,
        height: 240,
    },
    answers: {
        padding: theme.spacing(1),
    }
}))

const Question = (props) => {
    const classes = useStyles()
    const {question, time,answer_counts, question_index, question_total} = props
    const {title, image, answers, time_limit, correct_answers} = question
    const total_count = answer_counts.reduce((res, count) => res += count, 0)

    console.log(" image : ", image)

    var answerTotal = answer_counts.reduce((res, item) => res += item, 0)
    return (
        <div className = {classes.container}>
            <div className = {classes.header} >
                <Typography variant = 'btnLabel' sx = {{color: '#000', width: theme.spacing(20), textAlign: 'left'}}>
                    {`${question_index + 1}/${question_total}`}
                </Typography>
                <Typography variant = 'header' sx = {{color: '#000', flex: 1, textAlign: 'center'}}>
                    {title}
                </Typography>
                <Typography variant = 'btnLabel' sx = {{color: '#000', width: theme.spacing(20), textAlign: 'right'}}>
                    {`Answers: ${answerTotal}`}
                </Typography>
            </div>
        
            <Divider/>
            <div className = {classes.center}>
                {
                    image != null ?
                    <img className = {classes.img} src = {createUrl(image)}/>
                    :
                    <div className = {classes.img} />
                }
             
            </div>
            <div className = {classes.answers} >
                <Grid container columnSpacing = {1.5} rowSpacing = {1.5}>
                    {
                        answers.map((item, index) => (
                            <Grid item xs = {6}   key = {''+index}>
                                <Answer 
                                    style = {answerStyles[index]}
                                    answer = {item} 
                                    isCorrect = {null}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default Question
