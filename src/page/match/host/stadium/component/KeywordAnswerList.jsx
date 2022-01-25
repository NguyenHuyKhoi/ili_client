import { Grid, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../../../../theme'

const KeywordAnswer = (props) => {
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
                }} 
                alt = 'Avatar'
                src = {userAnswer.avatar}/>
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
    const {userAnswers, correct_answers, showAll} = props 
    
    const findUserAnswer = (keywordIndex) => {
        let userAnswer = userAnswers.find((item) => item.keywordIndex === keywordIndex)
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
