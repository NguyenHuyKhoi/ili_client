import { Add, ClassSharp } from '@mui/icons-material'
import { AppBar, Button, Divider, Grid, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useReducer,useContext, useState } from 'react'
import LabeledSelect from '../../../components/Select'
import { theme } from '../../../theme'
import { grey, blue } from '@mui/material/colors';
import gameCreatorReducer from '../../../contexts/game_creator/reducer'
import { GameCreatorContext } from '../../../contexts/game_creator/context'
import { addQuestion, selectQuestion } from '../../../contexts/game_creator/actions'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
    },
    questions: {
        display:'flex',
        flexDirection:'column',
        maxHeight: '70vh',
        overflow: 'auto'
    },
    questionContainer: {
        padding: theme.spacing(1),
        display:'flex',
        flexDirection:'column'
    },
    question: {
        flex:1,
        padding: theme.spacing(0.5),
        display:'flex',
        flexDirection:'column',
        backgroundColor:'gray'
    },
    answers: {
        flex:1,
        marginTop: theme.spacing(1)
    },
    answer: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        border: '1px solid gray',
        height:7
    },
    img: {
        height:25,
        width:45,
        alignSelf:'center',
        marginTop: theme.spacing(1)
    },
    bottom: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    }
}))
const QuestionCard = (props) => {
    const classes = useStyles()
    const {question} = props
    const {title, image, correct_answers} = question
    const limitTitle = title != null? title.substring(0, 20) + '...' : ''
    return (
        <div className = {classes.question} style={{backgroundColor: props.selected ? grey[100]:'white'}}>
            <Typography variant='caption' sx = {{alignSelf:'center'}}>
                {limitTitle}
            </Typography>
            <img src = {image != null ? URL.createObjectURL(image) : null} 
                className = {classes.img}/>
            <div className = {classes.answers}>
                <Grid container sx = {{flex: 1}}>
                {
                    Array.from(Array(4)).map((_, index) => (
                        <Grid item xs = {6} sx = {{p: theme.spacing(0.2)}}>
                            <div className = {classes.answer} 
                                style = {{backgroundColor: (correct_answers.indexOf(index) != -1) ? 'green' : 'white'}}/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
           
        </div>
    )
}

const QuestionList = (props) => {
    const classes = useStyles()
    const {game, dispatch} = useContext(GameCreatorContext)
    const {question_index, questions} = game
    const handleSelected = (index) => {
        dispatch(selectQuestion(index))
    }
    const handleAddQuestion = () => {
        dispatch(addQuestion())
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.questions} >
            {
                questions.map((item, index) => (
                    <div className = {classes.questionContainer} onClick = {()=>handleSelected(index)}
                        style={{
                            backgroundColor: question_index == index ? blue[100]:'white'
                        }}>
                        <Typography variant='subtitle2' sx = {{mb: theme.spacing(1)}}>
                            {
                                (index + 1) + ' quiz'
                            }
                        </Typography>
                        <QuestionCard selected = {question_index == index} question = {item}/>
                    </div>
                ))
            }
            </div>
            <Divider />
            <div className = {classes.bottom} >
                <Button variant = 'contained' color = 'primary' size = 'small' sx = {{py: theme.spacing(1.2)}}
                    onClick = {handleAddQuestion}>Add Question</Button>
                <Button variant = 'contained'  color = 'neutral' size = 'small' sx = {{mt: theme.spacing(2), py: theme.spacing(1.2)}}>Import Excel</Button>
            </div>
        </div>
    )
}

export default QuestionList
