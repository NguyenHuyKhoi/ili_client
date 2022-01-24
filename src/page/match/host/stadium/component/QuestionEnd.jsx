import { Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
import Answer from './Answer'
import {answerStyles} from '../../../../game/creator/component/Answers'
import AnswerCount from './AnswerCount'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.main,
        padding: theme.spacing(2)
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: theme.spacing(5),
        position: 'relative',
    },
    answerCounts: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    answers: {
        padding: theme.spacing(1),
    }
}))

const QuestionEnd = (props) => {
    const classes = useStyles()
    const {data} = props
    var {question, time, answer_counts} = data

    const {title, image, answers, correct_answer} = question
    const total_count = answer_counts.reduce((res, item) => res += item.count, 0)
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'header' sx = {{color: '#000'}}>
                    {title}
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.answerCounts}>
                    {
                        answer_counts.map((item, index) => (
                            <div style = {{marginLeft: theme.spacing(5)}} key = {'' + index}>
                                <AnswerCount   
                                    style = {answerStyles[index]}
                                    value = {item.value}
                                    count = {item.count}
                                    percent = {total_count == 0 ? 0 : item.count / total_count}
                                    isCorrect = {correct_answer == index}/>
                            </div>
                        ))
                    }
                </div>
             
            </div>
            <div className = {classes.answers} >
                <Grid container columnSpacing = {1.5} rowSpacing = {1.5}>
                    {
                        answers.map((item, index) => (
                            <Grid item xs = {6}   key = {''+index}>
                                <Answer
                                    style = {answerStyles[index]}
                                    answer = {item} 
                                    count = {answer_counts[index].count}
                                    isCorrect = {correct_answer == index}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default QuestionEnd
