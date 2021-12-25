import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import BottomBar from './component/BottomBar'
import Header from './component/Header'
import QuestionEnd from './component/QuestionEnd'
import Question from './component/Question'
import { updateMatch } from '../../../../context/match/play/actions'
import { useNavigate } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    questionContainer: {
        flex: 1
    }
}))

const MatchHostStadiumPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {question, match, answer_counts, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const [stage, setStage] = useState({type: 'on_question'})
    const [time, setTime] = useState(0)
    const {question_index} = match
    
    useEffect(() => {
        socket.on('match:onCountdown', (time) => {
            setTime(time)
        })
        socket.on('match:onTimeup', () => {
            console.log("On timeup: ", time)
            setTime(time)
        })

        socket.on('match:onEndQuestion', () => {
            console.log("On end question")
            setStage({type: 'end_question'})
        })

        socket.on('match:onQuestion', (match) => {
            dispatch(updateMatch(match))
            setStage({type: 'on_question'})
        })

        socket.on('match:onEnd', match => {
            dispatch(updateMatch(match))
            navigate('/match/host/finish', {replace: false})
        })
        return () => {
            
        }
    }, [])
    return (
        <div className = {classes.container}>
            <Header
                 question_index = {question_index}
                 question_total = {match.game.questions.length}/>
            <Divider/>
            <div className = {classes.questionContainer}>
                {
                    stage.type == 'end_question' ?
                    <QuestionEnd time = {time} /> 
                    :
                    stage.type == 'on_question' ?
                    <Question question = {question} time = {time} answer_counts = {answer_counts}/>
                    :
                    null
                }
            </div>  
            <BottomBar/>
        </div>
    )
}

export default MatchHostStadiumPage
