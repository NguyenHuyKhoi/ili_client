import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import { updateQuestion } from '../../../../context/game/creator/actions';
import { GameCreatorContext } from '../../../../context/game/creator/context';
import { createUrl } from '../../../../util/helper';
import Answers from './Answers';
import TextField from '../../../../component/TextField'
import TextArea from '../../../../component/TextArea'
import { theme } from '../../../../theme';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(5),
        display: 'flex',
        flex:1,
        height: '92vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.main,
        alignItems:'center'
    },
    titleBox: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        boxShadow: `1px 3px 1px #f0f0f0`,
        borderRadius: theme.spacing(0.5)

    },

    uploadImg: {
        width: 420,
        height: 280
    }
}))

const QuestionBuilder = () => {
    const classes = useStyles()
    const {game, dispatch} = useContext(GameCreatorContext)
    const {questions, questionIndex} = game
    let question = questions[questionIndex]
    
    const {title, image, answers, correct_answers} = question
    const handleChange = (key, value) => {
        question[key] = value
        dispatch(updateQuestion(question, questionIndex))
    }
    return ( 
        <div className = {classes.container}>
            <TextField 
                placeholder = 'Enter question ...' 
                style = {{ 
                    backgroundColor: 'white', textAlign: 'center',
                    height: theme.spacing(7),
                    width: '90%', fontSize: 30,
                    paddingLeft: theme.spacing(10),
                    paddingRight: theme.spacing(10)
                }}
                value={title == null ? '':title}
                onChange={ (value)=> handleChange('title', value)}/>

            <div className = {classes.uploadImg}>
                <MediaUploadCard 
                    onSelectImage = {(image) => handleChange('image', image)}
                    onRemoveImage = {() => handleChange('image', null)}
                    label = 'Upload a hint'
                    image = {image}/>
            </div>
            <Answers 
                answers = {answers}
                correct_answers = {correct_answers}
                onAnswerCorrectChange = {(correct_answers) => handleChange('correct_answers', correct_answers)}
                onAnswerChange = {(answers) => handleChange('answers',answers)}/>
        </div>
    )
}

export default QuestionBuilder
