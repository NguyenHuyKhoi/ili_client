import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import TextField from '../../../../component/TextField';
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
        width: '100%',
        aspectRatio: 1.6
    }
}))

const PicWordQuestionBuilder = (props) => {
    const classes = useStyles()
    const {question} = props
    
    const {title, images, correct_answer} = question
    const handleChange = (key, value) => {
        question[key] = value
        if (props.onChange) {
            props.onChange(question)
        }
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
                <Grid container columnSpacing={4} rowSpacing={4}>
                {
                    images.map((image, index) => (
                        <Grid item xs = {6} key = {'' + index}>
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
                    width: '50%', fontSize: 60,
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(2)
                }}
                value={correct_answer == null ? '':correct_answer}
                onChange={ (value)=> handleChange('correct_answer', value.toUpperCase())}/>
        
        </div>
    )
}

export default PicWordQuestionBuilder
