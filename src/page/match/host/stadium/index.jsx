import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMatch } from '../../../../context/match/classic/actions'
import { MatchClassicContext } from '../../../../context/match/classic/context'
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
        flexDirection: 'column'
    },
    questionContainer: {
        flex: 1
    }
}))

const MatchHostStadiumPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {question, match, answer_counts, dispatch} = useContext(MatchClassicContext)
    const {socket} = useContext(SocketContext)
    const [stage, setStage] = useState({type: 'on_question'})
    const [time, setTime] = useState(0)
    const {questionIndex, pinCode, players} = match

    useEffect(() => {
        socket.on('match:onCountdown', (time) => {
            setTime(time)
        })
        socket.on('match:onTimeup', () => {
            console.log("On timeup: ", time)
            setTime(time)
        })

        socket.on('match:onEndQuestion', (match) => {
            console.log("On end question")
            dispatch(updateMatch(match))
            setStage({type: 'end_question'})
        })

        socket.on('match:onQuestion', (match) => {
            dispatch(updateMatch(match))
            setStage({type: 'on_question'})
        })

        socket.on('match:scoreboard', (match) => {
            dispatch(updateMatch(match))
            setStage({type: 'scoreboard'})
        })

        socket.on('match:onEnd', match => {
            dispatch(updateMatch(match))
            navigate('/match/host/hall', {replace: false})
        })
        return () => {
            
        }
    }, [])
    return (
        <div className = {classes.container}>
            <Header
                 questionIndex = {questionIndex + 1}
                 question_total = {match.game.questions.length}/>
            <Divider/>
            <div className = {classes.questionContainer}>
                {
                    stage.type == 'end_question' ?
                    <QuestionEnd question = {question} time = {time} answer_counts = {answer_counts}/> 
                    :
                    stage.type == 'on_question' ?
                    <Question question = {question} time = {time} answer_counts = {answer_counts}/>
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
