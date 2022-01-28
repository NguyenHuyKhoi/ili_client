import { Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { QUESTION_TYPES_ID } from '../../../../../context/game/creator/context'
import { theme } from '../../../../../theme'
import { createUrl } from '../../../../../util/helper'
import { answerStyles } from '../../../../game/creator/component/Answers'
import Answer from './Answer'
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
    var {question, answer_counts} = data

    const {title, answers, correct_answer} = question
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
                {
                    question.typeId == QUESTION_TYPES_ID.PIC_WORD && 
                    <div style = {{
                        width: theme.spacing(90),
                        aspectRatio: 1.6,
                    }}>
                        <Grid container columnSpacing={2} rowSpacing={2}>
                        {
                            question.images.map((image, index) => (
                                <Grid item xs = {6} key = {'' + index}>
                                    <img style = {{
                                        width: '100%',
                                        height: theme.spacing(25),
                                        objectFit: 'cover'
                                    }}
                                        alt = 'Hint'
                                        src = {createUrl(image)}/>
                                </Grid>
                            ))
                        }
                        </Grid>
                    </div>
                }
                <div className = {classes.answerCounts}>
                    {
                        answer_counts.map((item, index) => (
                            <div style = {{marginLeft: theme.spacing(5)}} key = {'' + index}>
                                <AnswerCount   
                                    style = {answerStyles[index]}
                                    value = {item.value}
                                    count = {item.count}
                                    percent = {total_count ===  0 ? 0 : item.count / total_count}
                                    isCorrect = {correct_answer ==  index || correct_answer == item.value}/>
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
                                    isCorrect = {correct_answer ==  index}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default QuestionEnd
