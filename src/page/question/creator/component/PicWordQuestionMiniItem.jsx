import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(0.5),
        display:'flex',
        flexDirection:'column',
        position: 'relative',
        '&:hover': {
            cursor: 'pointer'
        }
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
        marginTop: theme.spacing(1)
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

const PicWordQuestionMiniItem = (props) => {
    const classes = useStyles()
    const {question} = props
    //console.log("Question :", question)
    const {title, images, correct_answer} = question
    const limitTitle = title != null? title.substring(0, 20) + '...' : 'Question'
    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? '#fff': theme.palette.background.main}}>
            <Typography variant='caption' sx = {{alignSelf:'center'}}>
                {limitTitle}
            </Typography>

            <div className= {classes.time} >
                <Typography variant='caption' sx = {{color: '#000'}}>
                    20
                </Typography>
            </div>
            <div style = {{
                width: theme.spacing(10),
                alignSelf: 'center'
            }}>
                <Grid container columnSpacing={0.5} rowSpacing={0.5}>
                {
                    images.map((image, index) => (
                        <Grid item xs = {6} key = {'' + index}>
                            <div style = {{
                                backgroundColor: image == null ? 'white': theme.palette.success.main,
                                width: '100%',
                                height: theme.spacing(2),
                                borderRadius: theme.spacing(0.2),
                                border: '1px solid #000'
                            }}/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
            <Typography variant='label' sx = {{alignSelf:'center'}}>
                {correct_answer == null || correct_answer == '' ? 'No keyword' : correct_answer}
            </Typography>
           
        </div>
    )
}

export default PicWordQuestionMiniItem
