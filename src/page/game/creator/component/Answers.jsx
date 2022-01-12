import { CheckCircleOutlineOutlined, CircleOutlined } from '@mui/icons-material';
import CropDinSharpIcon from '@mui/icons-material/CropDinSharp';
import { Grid, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Icon from '../../../../component/Icon';
import TextField from '../../../../component/TextField';
import {theme} from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%'   
    },
    answer: {
        backgroundColor: 'white ',
        flex:1,
        borderRadius: theme.spacing(0.6),
        boxShadow: `1px 3px 1px #f0f0f0`,
        display:'flex',
        flexDirection: 'row',
        height: 90,
        alignItems:'center',
        padding: theme.spacing(1)
    },
    shapeContainer: {
        height: '100%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: theme.spacing(0.5),
        paddingLeft: theme.spacing(0.5),
        borderRadius: theme.spacing(0.6)
    },
    titleInput: {
        flex:1,
        fontSize: 20,
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        flex: 1,
    }
}))

export const answerStyles = [
    {
        color: theme.palette.primary.main,
        icon: 'Triangle',
        placeholder: 'Add ...'
    },
    {
        color: theme.palette.info.main,
        icon: 'Rhombus',
        placeholder: 'Add ...'
    },
    {
        color: theme.palette.success.main,
        icon: 'CircleRounded',
        placeholder: 'Add ...'
    },
    {
        color: theme.palette.error.main,
        icon: 'Square',
        placeholder: 'Add ...'
    }
]

const Answer = (props) => {
    const classes = useStyles()
    const {answer, isCorrect, style} = props
    const {color, icon, placeholder} = style
    const handleAnswerChange = (value) => {
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
    console.log("Placehold: ", answer)
    return (
        <div className = {classes.answer} style={{backgroundColor: answer == null || answer == '' ?'white':color}}>
            <div className = {classes.shapeContainer}
                style={{backgroundColor: color}} >
                <Icon name = {icon} style= {{ 
                    color: isCorrect ? 'white' : theme.palette.background.main , fontSize: 30}} />
            </div>
            <TextField 
                style = {{
                    backgroundColor: 'rgba(0,0,0,0)',
                    border: 'none',
                    textAlign: 'left',
                    marginLeft: theme.spacing(2),
                    fontSize: 24,
                    flex: 1
                }}
                placeholder= {placeholder}
                className = {classes.titleInput} 
                value = {answer == null ? '' : answer}
                onChange = {handleAnswerChange}/>
            <div onClick = {handleCorrectChange}>
            {
                !isCorrect?
                <CircleOutlined sx = {{color: theme.palette.background.main, fontSize: 60}}/>
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
                    <Grid item xs={6}   key = {''+index}>
                        <Answer 
                            answer = {item} 
                            style= {answerStyles[index]}
                            isCorrect = {(correct_answers.indexOf(index) != -1)}
                            onChange = {(value) => handleAnswerChange(index, value)}
                            onChangeCorrect = {(isCorrect)=> handleAnswerCorrectChange(index,isCorrect)}/>
                    </Grid>
                ))}
            </Grid>
        </div>
        
    )
}

export default Answers
