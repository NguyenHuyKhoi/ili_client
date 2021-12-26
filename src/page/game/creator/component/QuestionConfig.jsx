import { Button, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import DropdownSelect from '../../../../component/DropdownSelect'
import { updateQuestion } from '../../../../context/game/creator/actions'
import { GameCreatorContext } from '../../../../context/game/creator/context'
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
    const {questions, questionIndex} = game
    const question = questions[questionIndex]
    const {score, time_limit} = question
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
                    <DropdownSelect title = 'Time limit'
                        list = {[
                            {label: '10', value: 10},
                            {label: '20', value: 20},
                            {label: '30', value: 30}
                        ]}
                        value = {time_limit}
                        onChange = {(value)=>handleChange('time_limit',value)}/>
                </div>
                <div className = {classes.input}>
                    <DropdownSelect title = 'Score'
                        list = {[
                            {label: '1000', value: 1000},
                            {label: '1200', value: 1200},
                            {label: '1500', value: 1500}
                        ]}
                        value = {score}
                        onChange = {(value)=>handleChange('score',value)}/>
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
