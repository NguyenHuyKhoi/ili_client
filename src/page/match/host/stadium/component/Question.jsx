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
    timer: {
        width: theme.spacing(14),
        height:  theme.spacing(14),
        borderRadius:  theme.spacing(7),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaf1fa',
        position: 'absolute',
        left: theme.spacing(2),
        top: 0,
        bottom: 0,
        margin: 'auto'
    },
    answerNumDiv: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        right: theme.spacing(2),
        top: 0,
        bottom: 0,
        margin: 'auto'
    },
    answerNumValue: {
        width: theme.spacing(8),
        height:  theme.spacing(8),
        borderRadius:  theme.spacing(4),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaf1fa',
    },
    answerNumLabel: {
        // height:  theme.spacing(5),
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(1,5),
        paddingRight: theme.spacing(1.5),
        marginTop: theme.spacing(1.2),
        borderRadius:  theme.spacing(3),
        backgroundColor: '#eaf1fa',
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
    const {question, time, answer_counts} = props
    const {title, image, answers, time_limit, correct_answers} = question
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'h5' sx = {{fontWeight: 600, color: '#333333'}}>
                    {title}
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.timer} >
                    <Typography variant = 'h3' sx = {{fontWeight: 'bold', color: '#333333'}}>
                        {time}
                    </Typography>
                </div>
                {
                    !image ?
                    <img className = {classes.img} src = {createUrl(image)}/>
                    :
                    <div className = {classes.img} />
                }

                <div className = {classes.answerNumDiv}>
                    <div className = {classes.answerNumValue}>
                        <Typography variant = 'h4' sx = {{color: '#333333', fontWeight: 'bold'}}>
                            5
                        </Typography>
                    </div>
                    <div className = {classes.answerNumLabel}>
                        <Typography variant = 'h5' sx = {{color: '#333333', fontWeight: 'bold'}}>
                            Answers
                        </Typography>
                    </div>
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

export default Question
