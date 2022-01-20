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
        position: 'relative'
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
        height: theme.spacing(2)
    },
    img: {
        height:30,
        aspectRatio: 1.6,
        alignSelf:'center',
        marginTop: theme.spacing(1),
        borderRadius: theme.spacing(0.5),
        border: '1px solid #000'
    },
    time: {
        position: 'absolute',
        width: 26,
        height: 26,
        borderRadius: 13,
        border: '1px solid #000',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        left: theme.spacing(2),
        top: 0,
        bottom: 0,
        margin: 'auto'
    }
}))

const TFChoicesQuestionMiniItem = (props) => {
    const classes = useStyles()
    const {question} = props
    //console.log("Question :", question)
    const {title, image, correct_answer} = question
    const limitTitle = title != null? title.substring(0, 20) + '...' : 'Question'
    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? '#fff': theme.palette.background.main}}>
            <Typography variant='caption' sx = {{alignSelf:'center'}}>
                {limitTitle}
            </Typography>
            <div style = {{
                backgroundColor: image == null ? 'white': theme.palette.success.main,
            }} 
                className = {classes.img}/>

            <div className= {classes.time} >
                <Typography variant='caption' sx = {{color: '#000'}}>
                    20
                </Typography>
            </div>
            <div className = {classes.answers}>
                <Grid container sx = {{flex: 1}}>
                {
                    Array.from(Array(2)).map((_, index) => (
                        <Grid item xs = {6} sx = {{p: theme.spacing(0.2)}}   key = {''+index}>
                            <div className = {classes.answer} 
                                style = {{backgroundColor: (correct_answer == index) ? theme.palette.success.main : 'white'}}/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
           
        </div>
    )
}

export default TFChoicesQuestionMiniItem
