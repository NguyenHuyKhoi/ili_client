import { Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { theme } from '../../../../../theme'
import { createUrl } from '../../../../../util/helper'
import { answerStyles } from '../../../../question/creator/component/Answers'
import Answer from './Answer'
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
        height: theme.spacing(50),
        objectFit: 'center'
    },
    answers: {
        padding: theme.spacing(1),
    }
}))

const TFChoiceQuestion = (props) => {
    const classes = useStyles()
    const [selected, setSelected] = useState(null)
    const {data} = props
    var {question,answer_counts, question_index, question_total, isPlayer} = data
    const {title, image, answers} = question

    var answerTotal = answer_counts.reduce((res, item) => res += item.count, 0)

    const handleAnswer = (index) => {
        if (!isPlayer) return
        if (selected != null) return 
        setSelected(index)
        if (props.onAnswer) props.onAnswer(index)

    }
    if (isPlayer == undefined) isPlayer = false 
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
                    <img className = {classes.img} src = {createUrl(image)} alt = 'Hint'/>
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
                                    onClick = {() => handleAnswer(index)}
                                    isSelected = {selected == null ? null : (selected === index)}
                                    isCorrect = {null}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default TFChoiceQuestion
