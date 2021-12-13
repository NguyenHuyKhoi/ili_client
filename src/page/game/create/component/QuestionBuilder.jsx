import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import { updateQuestion } from '../../../../context/game/create/actions';
import { GameCreatorContext } from '../../../../context/game/create/context';
import Answers from './Answers';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        display: 'flex',
        flex:1,
        height: '85vh',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: grey[300],
        alignItems:'center',
    },
    titleBox: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        boxShadow: `1px 3px 1px #f0f0f0`,
        borderRadius: theme.spacing(1)

    },
    titleInput: {
        fontSize: 30,
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign: 'center',
        flex: 1,
        "&$focuse": {
            outline: 'none'
        }

    },
    uploadImg: {
        width: 400,
        height: 250
    }
}))

const QuestionBuilder = () => {
    const classes = useStyles()
    const {game, dispatch} = useContext(GameCreatorContext)
    const {questions, question_index} = game
    let question = questions[question_index]

    
    const {title, image, answers, correct_answers} = question
    const handleChange = (key, value) => {
        question[key] = value
        dispatch(updateQuestion(question, question_index))
    }
    return ( 
        <div className = {classes.container}>
            <div className = {classes.titleBox} >
                <input type = 'text' placeholder = 'Enter question here' className = {classes.titleInput}
                    value={title}
                    onChange={e => handleChange('title',e.target.value)}/>
            </div>
            <div className = {classes.uploadImg}>
                <MediaUploadCard 
                    onSelectImage = {(image) => handleChange('image', image)}
                    onRemoveImage = {() => handleChange('image', null)}
                    src = {image != null ?URL.createObjectURL(image) : undefined}/>
            </div>
            <Answers answers = {answers}
                correct_answers = {correct_answers}
                onAnswerCorrectChange = {(correct_answers) => handleChange('correct_answers', correct_answers)}
                onAnswerChange = {(answers) => handleChange('answers',answers)}/>
        </div>
    )
}

export default QuestionBuilder
