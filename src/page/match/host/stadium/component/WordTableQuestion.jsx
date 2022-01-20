import { Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useState} from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
import Answer from './Answer'
import {answerStyles} from '../../../../game/creator/component/Answers'
import Button from '../../../../../component/Button'
import TextField from '../../../../../component/TextField'
import { WORD_TABLE_SIZE } from '../../../../../context/game/creator/context'
import CharTable from './CharTable'
import KeywordAnswerList from './KeywordAnswerList'
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
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.background.main,
    },
    img: {
        aspectRatio: 1.6,
        height: 240,
    },
    answerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2)
    }
}))

const WordTableQuestion = (props) => {
    const classes = useStyles()
    const [userAnswer, setuserAnswer] = useState('');
    const {data} = props
    var {question, time,answer_counts, question_index, question_total, isPlayer, open_word_states , userAnswers} = data
    const {title, image, answers, time_limit, correct_answer, char_table, correct_answers} = question


    var answerTotal = answer_counts.reduce((res, item) => res += item, 0)

    const handleAnswer = () => {
        if (!isPlayer) return
        console.log("Send answer from input:", userAnswer);
        if (props.onAnswer) props.onAnswer(userAnswer)
        setuserAnswer('')

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
            <Grid container sx = {{flex: 1}}>
                <Grid item xs = {6} sx = {{display: 'flex',flexDirection: 'column', justifyContent: 'center',alignItems:'center'}}>
                    <CharTable 
                        table = {char_table}
                        showAll = {!isPlayer}
                        correct_answers = {correct_answers}
                        open_word_states = {open_word_states} />
                    {
                        isPlayer && 
                        <div style = {{
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: theme.spacing(3),
                        }}>
                            <Button 
                                label = 'Clear'
                                variant = 'warning'
                                size = 'small'
                                style = {{width: theme.spacing(16),marginRight: theme.spacing(3),alignSelf: 'center'}}
                                onClick = {() => setuserAnswer('')}/>
                            <TextField 
                                style = {{ 
                                    backgroundColor: 'white', 
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    padding: theme.spacing(1),
                                    width: theme.spacing(30), fontSize: 40,
                                    paddingLeft: theme.spacing(2),
                                    paddingRight: theme.spacing(2)
                                }}
                                value={userAnswer}
                                onChange={ (value)=> setuserAnswer(value.toUpperCase())}/>
                            <Button 
                                label = 'Answer'
                                variant = 'success'
                                size = 'small'
                                style = {{width: theme.spacing(16),marginLeft: theme.spacing(3),alignSelf: 'center'}}
                                onClick = {handleAnswer}/>
                            <div style = {{flex: 1}}>
                            </div>
                    
                        </div>
                    }
                
                </Grid>
                <Grid item xs = {6} sx = {{display: 'flex',flexDirection: 'column', justifyContent: 'center',alignItems:'center'}}>
                    <KeywordAnswerList 
                        correct_answers = {correct_answers}
                        userAnswers = {userAnswers}
                        showAll = {!isPlayer}/>
                </Grid>
            </Grid>
          
       </div>
    )
}

export default WordTableQuestion
