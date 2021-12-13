import { Button, Divider, Grid, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { addQuestion, selectQuestion } from '../../../../context/game/create/actions'
import { GameCreatorContext } from '../../../../context/game/create/context'
import { theme } from '../../../../theme'
import QuestionMiniItem from './QuestionMiniItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column',
        maxHeight: '70vh',
        overflow: 'auto'
    },
    item: {
        padding: theme.spacing(1),
        display:'flex',
        flexDirection:'column'
    },
    bottom: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    }
}))

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
            <div className = {classes.list} >
            {
                questions.map((item, index) => (
                    <div className = {classes.item} onClick = {()=>handleSelected(index)}
                        style={{
                            backgroundColor: question_index == index ? blue[100]:'white'
                        }}>
                        <Typography variant='subtitle2' sx = {{mb: theme.spacing(1)}}>
                            {
                                (index + 1) + ' quiz'
                            }
                        </Typography>
                        <QuestionMiniItem selected = {question_index == index} question = {item}/>
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
