import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext, useEffect, useState} from 'react'
import Header from './component/Header'
import Timesup from './component/Timesup'
import BottomBar from './component/BottomBar'
import Correct from './component/Correct'
import Incorrect from './component/Incorrect'
import Question from './component/Question'
import { MatchClassicContext } from '../../../../context/match/classic/context'
import { SocketContext } from '../../../../context/socket/context'
import { updateMatch } from '../../../../context/match/classic/actions'
import { useNavigate } from 'react-router-dom'
import Scoreboard from '../../host/stadium/component/Scoreboard'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    questionContainer: {
    }
}))

const INPUT_STAGE = {
    ENTER_PIN: 0, 
    ENTER_NAME: 1
}
const MatchPlayerStadiumPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {question, match, dispatch} = useContext(MatchClassicContext)
    const {socket} = useContext(SocketContext)
    const [earnScore, setEarnScore] = useState(0)
    const [time, setTime] = useState(0)
    const [stage, setStage] = useState({type:'on_question'})
    const {questionIndex, pinCode, players} = match

    useEffect(() => {
        socket.on('match:onCountdown', (time) => {
            setTime(time)
        })
        socket.on('match:onTimeup', () => {
            setTime(time)
        })

        socket.on('match:onNotAnswer', () => {
            setStage({type: 'not_answer'})
        })

        socket.on('match:onCorrectAnswer', (earnScore) => {
            setStage({type: 'correct_answer'})
            setEarnScore(earnScore)
        })

        socket.on('match:onWrongAnswer', () => {
            setStage({type: 'wrong_answer'})
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
            navigate('/match/player/hall', {replace: false})
        })
        return () => {
            
        }
    }, [])

    const handleAnswer = (index) => {
        socket.emit('match:answer', pinCode, index, time)
    }

    const findMe = () => {
        let player = match.players.find((item, index) => item.socketId == socket.id) 
            ||
            {
                name: 'Unknown',
                score: 0
            }
        return player
    }
    return (
        <div className = {classes.container}>
            <Header
                 questionIndex = {questionIndex + 1}
                 question_total = {match.game.questions.length}/>
            <Divider/>
            {
                stage.type == 'on_question' ?
                <div className = {classes.questionContainer}>
                    <Question question = {question} time = {time}
                        onAnswer = {handleAnswer}/>
                </div>
                : stage.type == 'not_answer'? 
                <Timesup/>
                : stage.type == 'correct_answer'?
                <Correct earnScore = {earnScore}/>
                : stage.type == 'wrong_answer' ?
                <Incorrect/>
                : stage.type == 'scoreboard' ?
                <Scoreboard time = {time} players = {players}/>
                : null
            }
            <BottomBar player = {findMe()}/>
        </div>
    )
}

export default MatchPlayerStadiumPage
