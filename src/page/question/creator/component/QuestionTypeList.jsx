import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Button from '../../../../component/Button'
import { QUESTION_TYPES_ID } from '../../../../context/question/creator/context'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(5)
    },
    item: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        maxHeight: theme.spacing(28),   
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(2),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px'
    }
}))


const types = [
    {
        title: 'Multiple Choice',
        desc: 'Give 4 answers to choice.',
        id: QUESTION_TYPES_ID.MULTIPLE_CHOICE
    },
    {
        title: 'True/false',
        desc: 'Decide statement is true/false.',
        id: QUESTION_TYPES_ID.TF_CHOICE
    },
    {
        title: '4 Pic 1 word',
        desc: 'Guess a work with 4 hint images.',
        id: QUESTION_TYPES_ID.PIC_WORD
    },
    {
        title: 'Word table',
        desc: 'Find all words hide in table.',
        id: QUESTION_TYPES_ID.WORD_TABLE
    },
]
const QuestionType = (props) => {
    const classes = useStyles()
    const {type} = props 
    const {title, desc} = type

    return (
        <div className = {classes.item}>
            <Typography variant = 'btnLabel'  
                sx = {{ color: '#000', alignSelf: 'center'}}>
                {title}
            </Typography>
            <Typography variant = 'caption' 
                sx = {{
                    color: '#000', my: theme.spacing(0.5), textAlign: 'center'}}>
                {desc}
            </Typography>
      

            <Button 
                variant = 'success' 
                size = 'small'
                onClick = {() => {
                    if (props.onSelect) props.onSelect()
                }}
                style = {{color: '#000', width: '75%', marginTop: theme.spacing(2)}}
                label = 'Choose'/>
        </div>
    )
}

const QuestionTypeList = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Grid container columnSpacing = {3} rowSpacing = {3}>
                {
                    types.map((type, index) => (
                        <Grid item xs = {6}   key = {''+index}>
                            <QuestionType type = {type} 
                                onSelect = {() => {
                                    if (props.onSelect) props.onSelect(type.id) 
                                }}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}
export default QuestionTypeList
