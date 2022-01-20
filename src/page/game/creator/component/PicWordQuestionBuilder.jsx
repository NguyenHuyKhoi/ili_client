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
import { Grid } from '@mui/material';
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
        width: '100%',
        aspectRatio: 1.6
    }
}))

const PicWordQuestionBuilder = () => {
    const classes = useStyles()
    const {game, dispatch} = useContext(GameCreatorContext)
    const {questions, questionIndex} = game
    let question = questions[questionIndex]
    
    const {title, images, correct_answer} = question
    console.log("Question in builder:", question);
    const handleChange = (key, value) => {
        question[key] = value
        dispatch(updateQuestion(question, questionIndex))
    }

    const handleChangeImage = (index, value) => {
        question.images[index] = value
        handleChange('images', question.images)
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

            <div style = {{
                width: theme.spacing(80),
                aspectRatio: 1.6,
                alignItems: 'center'
            }}>
                <Grid container columnSpacing={3} rowSpacing={3}>
                {
                    images.map((image, index) => (
                        <Grid item xs = {6} >
                             <div className = {classes.uploadImg}>
                                <MediaUploadCard 
                                    onSelectImage = {(image) => handleChangeImage(index, image)}
                                    onRemoveImage = {() => handleChangeImage(index, null)}
                                    label = 'Upload a hint'
                                    image = {image}/>
                            </div>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
            
            <TextField 
                placeholder = 'Keyword ...' 
                style = {{ 
                    backgroundColor: 'white', textAlign: 'center',
                    padding: theme.spacing(1),
                    width: '50%', fontSize: 80,
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(2)
                }}
                value={correct_answer == null ? '':correct_answer}
                onChange={ (value)=> handleChange('correct_answer', value)}/>
        
        </div>
    )
}

export default PicWordQuestionBuilder
