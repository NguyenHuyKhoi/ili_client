import { Check, Close, Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        height: theme.spacing(10),
        display: 'flex',
        flexDirection:'column',
        alignItems : 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: 'red',
        borderRadius: theme.spacing(0.5),
        boxShadow: `1px 3px 1px #f0f0f0`,
    }
}))

const KeywordAnswer = (props) => {
    const classes = useStyles()
    var {isShow, content, userAnswer} = props 

    var hideAnswer = ''
    Array.from(Array(content.length)).forEach(() => hideAnswer += '?')
    return (
        <div style = {{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#CDDCDC',
            padding: theme.spacing(0.6)
        }}>
            {
                userAnswer ? 
                <img style = {{
                    height: theme.spacing(6),
                    aspectRatio: 1
                }} src = {userAnswer.avatar}/>
                :
                <div style = {{
                    height: theme.spacing(6),
                    aspectRatio: 1
                }}/>
            }
        
            <Typography variant = 'btnLabel' sx = {{color: '#000',flex: 1, mx: theme.spacing(2)}}>
                {userAnswer ? userAnswer.username : ''}
            </Typography>
            <Typography variant = 'bigLabel' sx = {{color: '#000', mr: theme.spacing(2)}}>
                {isShow || userAnswer ? content : hideAnswer}
            </Typography>
        </div>  
    )
}

const KeywordAnswerList = (props) => {
    const classes = useStyles()
    const {userAnswers, correct_answers, showAll} = props 
    
    const findUserAnswer = (keywordIndex) => {
        let userAnswer = userAnswers.find((item) => item.keywordIndex == keywordIndex)
        return userAnswer
    }
    return (
        <div style = {{
            width: '100%',
            padding: theme.spacing(5)
        }}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                {
                    correct_answers.map((item, index) => (
                        <Grid item xs = {6} key = {'' + index} >
                            <KeywordAnswer 
                                content = {item} 
                                userAnswer = {findUserAnswer(index)}
                                isShow = {showAll}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>  
    )
}

export default KeywordAnswerList
