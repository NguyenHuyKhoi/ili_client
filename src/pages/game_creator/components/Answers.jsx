import { AppBar, Grid, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { theme } from '../../../theme'
import CropDinSharpIcon from '@mui/icons-material/CropDinSharp';
import { CheckCircleOutlineOutlined, CircleOutlined } from '@mui/icons-material';
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%'   
    },
    answer: {
        backgroundColor: 'white ',
        flex:1,
        borderRadius: theme.spacing(1),
        boxShadow: `1px 3px 1px #f0f0f0`,
        display:'flex',
        flexDirection: 'row',
        height: 85,
        alignItems:'center',
        padding: theme.spacing(1)
    },
    shapeContainer: {
        height: '100%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    titleInput: {
        flex:1,
        fontSize: 20,
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        flex: 1,
        "&$focused": {
            outline: 'none'
        }

    }
}))

const Answer = (props) => {
    const classes = useStyles()
    const {answer, isCorrect, color} = props
    const handleAnswerChange = (e) => {
        var value = e.target.value
        if (props.onChange) {
            props.onChange(value)
        }
        if (answer == "" || answer == null ) handleCorrectChange()
    }

    const handleCorrectChange = () => {
        if (answer == "" || answer == null) return
        if (props.onChangeCorrect) {
            props.onChangeCorrect(!isCorrect)
        }
    }
    return (
        <div className = {classes.answer} style={{backgroundColor: answer == null || answer == '' ?'white':color}}>
            <div className = {classes.shapeContainer}
                style={{backgroundColor: color}} >
                <CropDinSharpIcon sx = {{backgroundColor: 'white', color: 'white'}} />
            </div>
            <input type = 'text' placeholder = '' 
                className = {classes.titleInput} 
                value = {answer}
                onChange = {handleAnswerChange}/>
            <div onClick = {handleCorrectChange}>
            {
                !isCorrect?
                <CircleOutlined sx = {{color: 'white', fontSize: 60}}/>
                :
                <CheckCircleOutlineOutlined sx = {{color: 'white', fontSize: 60}}/>
            }
            </div>
            
        </div>
    )
}
const Answers = (props) => {
    const classes = useStyles()
    let {answers, correct_answers} = props
    const handleAnswerChange = (index, value) => {
        answers[index] = value
        if (props.onAnswerChange) {
            props.onAnswerChange(answers)
        }
    }
    const handleAnswerCorrectChange = (index, isCorrect) => {
        // ONLY correct answers
        correct_answers = isCorrect ? [index] : []
        if (props.onAnswerCorrectChange) {
            props.onAnswerCorrectChange(correct_answers)
        }
    }
    return (
        <div className = {classes.container}>
            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1.5 }} sx = {{width:'100%',height:'100%'}}>
                {answers.map((item, index) => (
                    <Grid item xs={6}>
                        <Tooltip open={true} title="Add">
                            <Answer answer = {item} 
                                color = {['red','blue','yellow','green'][index]}
                                isCorrect = {(correct_answers.indexOf(index) != -1)}
                                onChange = {(value) => handleAnswerChange(index, value)}
                                onChangeCorrect = {(isCorrect)=> handleAnswerCorrectChange(index,isCorrect)}/>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>
        </div>
        
    )
}

export default Answers
