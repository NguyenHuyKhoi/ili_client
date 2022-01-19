import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import BottomBar from './component/BottomBar'
import Header from './component/Header'
import Question from './component/Question'
import QuestionEnd from './component/QuestionEnd'
import Scoreboard from './component/Scoreboard'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
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
    const [timeTotal, setTimeTotal] = useState(question.time_limit)
    const {questionIndex, pinCode, players} = match


    useEffect(() => {
        setTimeTotal(question.time_limit)
        socket.on('match:onCountdown', (data) => {
            let {time} = data
            console.log("Receive emit on countdown: ",  time)
            setTime(time)
        })

        socket.on('match:onEndQuestion', (data) => {
            let {match, timeTotal} = data
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            dispatch(updateMatch(match))
            setStage({type: 'end_question'})
        })

        socket.on('match:onQuestion', (data) => {
            let {match, timeTotal} = data
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            dispatch(updateMatch(match))
            setStage({type: 'on_question'})
        })

        socket.on('match:scoreboard', (data) => {
            let {match, timeTotal} = data
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            dispatch(updateMatch(match))
            setStage({type: 'scoreboard'})
        })

        socket.on('match:onSummary', (data) => {
            let {match} = data
            dispatch(updateMatch(match))
            navigate('/match/host/hall', {replace: true})
        })
        return () => {
            
        }
    }, [])
    return (
        <div className = {classes.container}>
            <Header
                time = {time}
                timeTotal = {timeTotal}/>
            <div className = {classes.questionContainer}>
                {
                    stage.type == 'end_question' ?
                    <QuestionEnd 
                        question = {question} 
                        time = {time} 
                        answer_counts = {answer_counts}
                        /> 
                    :
                    stage.type == 'on_question' ?
                    <Question 
                        question = {question} 
                        time = {time} 
                        answer_counts = {answer_counts}
                        question_index = {questionIndex}
                        question_total = {match.game.questions.length}/>
                    :
                    stage.type == 'scoreboard' ?
                    <Scoreboard players = {players} time = {time}/>
                    :
                    null
                }
            </div>  
            <BottomBar pinCode = {pinCode}/>
        </div>
    )
}

export default MatchHostStadiumPage
