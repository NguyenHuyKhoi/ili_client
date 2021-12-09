import { Add, ClassSharp } from '@mui/icons-material'
import { AppBar, Button, Divider, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import LabeledSelect from '../../../components/Select'
import { deleteQuestion, updateQuestion } from '../../../contexts/game_creator/actions'
import { GameCreatorContext } from '../../../contexts/game_creator/context'
import { theme } from '../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        flex:1,
        height: '85vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
    },
    inputs: {
        flex:1, 
        flexDirection:'column',
    },
    input: {
        marginBottom: theme.spacing(5)
    },
    bottom: {
        padding: theme.spacing(3),
        backgroundColor:'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
}))

const QuestionConfig = (props) => {
    const classes = useStyles()
    const {game, dispatch} = useContext(GameCreatorContext)
    const {questions, question_index} = game
    const question = questions[question_index]
    const handleDeleteQuestion = () => {
        if (props.onClickDelete) {
            props.onClickDelete()
        }
    }
    const handleDuplicateQuestion = () => {
        if (props.onClickDuplicate) {
            props.onClickDuplicate()
        }
    }
    const handleChange = (key, value) => {
        question[key] = value
        dispatch(updateQuestion(question))
        
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.inputs} >
                <div className = {classes.input}>
                    <LabeledSelect title = 'Time limit'
                        list = {[
                            {label: '10', value: 10},
                            {label: '20', value: 20},
                            {label: '30', value: 30}
                        ]}
                        value = {question.time_limit}
                        onChange = {(value)=>handleChange('time_limit',value)}/>
                </div>
            </div>
            <Divider />
            <div className = {classes.bottom} >
                <Button variant = 'text'    onClick = {handleDeleteQuestion} >Delete</Button>
                <Button variant = 'outlined'   onClick = {handleDuplicateQuestion}>Duplicate</Button>
            </div>
        </div>
    )
}

export default QuestionConfig
