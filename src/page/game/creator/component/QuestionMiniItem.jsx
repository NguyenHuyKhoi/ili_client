import { Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(0.5),
        display:'flex',
        flexDirection:'column',
        backgroundColor:'gray'
    },
    answers: {
        flex:1,
        marginTop: theme.spacing(1)
    },
    answer: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        border: '1px solid gray',
        height:7
    },
    img: {
        height:25,
        width:45,
        alignSelf:'center',
        marginTop: theme.spacing(1)
    }
}))

const QuestionMiniItem = (props) => {
    const classes = useStyles()
    const {question} = props
    //console.log("Question :", question)
    const {title, image, correct_answers} = question
    const limitTitle = title != null? title.substring(0, 20) + '...' : ''
    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? grey[100]:'white'}}>
            <Typography variant='caption' sx = {{alignSelf:'center'}}>
                {limitTitle}
            </Typography>
            <img src = {createUrl(image)} 
                className = {classes.img}/>
            <div className = {classes.answers}>
                <Grid container sx = {{flex: 1}}>
                {
                    Array.from(Array(4)).map((_, index) => (
                        <Grid item xs = {6} sx = {{p: theme.spacing(0.2)}}   key = {''+index}>
                            <div className = {classes.answer} 
                                style = {{backgroundColor: (correct_answers.indexOf(index) != -1) ? 'green' : 'white'}}/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
           
        </div>
    )
}

export default QuestionMiniItem
