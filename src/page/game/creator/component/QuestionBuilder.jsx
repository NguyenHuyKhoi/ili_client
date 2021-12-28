import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import { updateQuestion } from '../../../../context/game/creator/actions';
import { GameCreatorContext } from '../../../../context/game/creator/context';
import { createUrl } from '../../../../util/helper';
import Answers from './Answers';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        display: 'flex',
        flex:1,
        height: '85vh',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#f2f2f1',
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
        borderRadius: theme.spacing(0.5)

    },
    titleInput: {
        fontSize: 30,
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign: 'center',
        flex: 1
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
            <div className = {classes.titleBox} >
                <input 
                    type = 'text' 
                    style = {{fontSize: 25, color: '#757575'}}
                    placeholder = 'Enter question here' 
                    className = {classes.titleInput}
                    value={title == null ? '':title}
                    onChange={e => handleChange('title',e.target.value)}/>
            </div>
            <div className = {classes.uploadImg}>
                <MediaUploadCard 
                    onSelectImage = {(image) => handleChange('image', image)}
                    onRemoveImage = {() => handleChange('image', null)}
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
