import {Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import Button from '../../../../component/Button'
import DropdownSelect from '../../../../component/DropdownSelect'
import { updateQuestion } from '../../../../context/game/creator/actions'
import { GameCreatorContext } from '../../../../context/game/creator/context'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        height: '92vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
        boxShadow: `1px 3px 1px #f0f0f0`,
        paddingTop: theme.spacing(5)
    },
    inputs: {
        flex:1, 
        flexDirection:'column',
        padding: theme.spacing(2)
    },
    input: {
        marginBottom: theme.spacing(5)
    },
    bottom: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.secondary.main
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
                    <DropdownSelect 
                        title = 'Time'
                        list = {[
                            {label: '10s', value: 10},
                            {label: '20s', value: 20},
                            {label: '60s', value: 60}
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
                <Button 
                    variant = 'primary' 
                    size = 'small' 
                    style = {{ width: theme.spacing(20), alignSelf: 'center'}}
                    onClick = {handleDuplicateQuestion}
                    label = 'Duplicate'/>
                <Button 
                    variant = 'warning'  
                    size = 'small' 
                    style = {{marginTop: theme.spacing(2), width: theme.spacing(20), alignSelf: 'center'}}
                    label = 'Delete'
                    onClick = {handleDeleteQuestion}/>
            </div>
        </div>
    )
}

export default QuestionConfig
