import { Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import CharTable from './CharTable'
import KeywordPlayerList from './KeywordPlayerList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: 'column'
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7)
    },
    header: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.background.main,
    },
    img: {
        aspectRatio: 1.6,
        height: 240,
    },
    answerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2)
    }
}))

const WordTableQuestionEnd = (props) => {
    const classes = useStyles()
    const {data} = props
    var {question,answer_counts, question_index, question_total, isPlayer, open_word_states, userAnswers} = data
    const {title, char_table, correct_answers} = question


    var answerTotal = answer_counts.reduce((res, item) => res += item, 0)

    if (isPlayer == undefined) isPlayer = false 
    return (
        <div className = {classes.container}>
            <div className = {classes.header} >
                <Typography variant = 'btnLabel' sx = {{color: '#000', width: theme.spacing(20), textAlign: 'left'}}>
                    {`${question_index + 1}/${question_total}`}
                </Typography>
                <Typography variant = 'header' sx = {{color: '#000', flex: 1, textAlign: 'center'}}>
                    {title}
                </Typography>
                <Typography variant = 'btnLabel' sx = {{color: '#000', width: theme.spacing(20), textAlign: 'right'}}>
                    {`Answers: ${answerTotal}`}
                </Typography>
            </div>
        
            <Divider/>
            <Grid container sx = {{flex: 1}}>
                <Grid item xs = {6} sx = {{display: 'flex',flexDirection: 'column', justifyContent: 'center',alignItems:'center'}}>
                    <CharTable 
                        table = {char_table}
                        showAll = {true}
                        correct_answers = {correct_answers}
                        open_word_states = {open_word_states} />
                </Grid>
                <Grid item xs = {6} sx = {{display: 'flex',flexDirection: 'column', justifyContent: 'center',alignItems:'center'}}>
                    <KeywordPlayerList userAnswers = {userAnswers}/>
                </Grid>
            </Grid>
          
       </div>
    )
}

export default WordTableQuestionEnd
