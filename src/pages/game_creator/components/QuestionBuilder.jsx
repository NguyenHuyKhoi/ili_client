import { Container, Grid, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React from 'react'
import { grey } from '@mui/material/colors';
import MediaUploadCard from './MediaUploadCard';
import Answers from './Answers';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        paddingTop: theme.spacing(10),
        display: 'flex',
        flex:1,
        height: '100%',
        flexDirection: 'column',
        justifyContent:'space-evenly',
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

    }
}))

const QuestionBuilder = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.titleBox} >
                <input type = 'text' placeholder = 'Enter question here' className = {classes.titleInput}/>
            </div>
            <MediaUploadCard/>
            <Answers/>
        </div>
    )
}

export default QuestionBuilder
