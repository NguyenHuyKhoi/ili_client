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
        backgroundColor: '#46178f',
        flexDirection: 'column'
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
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7)
    },
    answerCounts: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    countdown: {
        width: theme.spacing(20),
        borderRadius:  theme.spacing(0.8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaf1fa',
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
    },
    answers: {
        padding: theme.spacing(1),
    }
}))

const QuestionEnd = (props) => {
    const classes = useStyles()
    let {question, time, answer_counts} = props
    const {title, image, answers, time_limit, correct_answers} = question
    const total_count = answer_counts.reduce((res, count) => res += count, 0)
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'h5' sx = {{fontWeight: 600, color: '#333333'}}>
                    {title}
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.answerCounts}>
                    {
                        answers.map((answer, index) => (
                            <div style = {{marginLeft: theme.spacing(2)}} key = {'' + index}>
                                <AnswerCount   
                                    style = {answerStyles[index]}
                                    answer = {answer} 
                                    count = {answer_counts[index]}
                                    percent = {total_count == 0 ? 0 : answer_counts[index] / total_count}
                                    isCorrect = {correct_answers.indexOf(index) != -1}/>
                            </div>
                        ))
                    }
                </div>
              
                <div className = {classes.countdown}>
                    <Typography variant = 'h3' sx = {{color: '#333333', fontWeight: 'bold'}}>
                        {time}
                    </Typography>
                    <Typography variant = 'h5' sx = {{color: '#333333', fontWeight: 'bold'}}>
                        Get ready
                    </Typography>
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
                                    count = {answer_counts[index]}
                                    isCorrect = {correct_answers.indexOf(index) != -1}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default QuestionEnd
