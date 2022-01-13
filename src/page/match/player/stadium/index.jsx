import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext, useEffect, useState} from 'react'
import Timesup from './component/Timesup'
import BottomBar from './component/BottomBar'
import Correct from './component/Correct'
import Incorrect from './component/Incorrect'
import Question from './component/Question'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import { updateMatch } from '../../../../context/match/play/actions'
import { useNavigate } from 'react-router-dom'
import Scoreboard from '../../host/stadium/component/Scoreboard'
import Header from '../../host/stadium/component/Header'
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

const INPUT_STAGE = {
    ENTER_PIN: 0, 
    ENTER_NAME: 1
}
const MatchPlayerStadiumPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {question, match, dispatch, answer_counts} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const [earnScore, setEarnScore] = useState(0)
    const [time, setTime] = useState(0)
    const [timeTotal, setTimeTotal] = useState(question.time_limit)
    const [stage, setStage] = useState({type:'on_question'})
    const {questionIndex, pinCode, players} = match

    useEffect(() => {
        socket.on('match:onCountdown', (data) => {
            let {time} = data
            console.log("Receive emit on countdown: ",  time)
            setTime(time)
        })

        socket.on('match:onNotAnswer', (data) => {
            let {timeTotal} = data 

            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            setStage({type: 'not_answer'})
        })

        socket.on('match:onCorrectAnswer', (data) => {
            let {timeTotal, earnScore} = data 
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            setStage({type: 'correct_answer'})
            setEarnScore(earnScore)
        })

        socket.on('match:onWrongAnswer', (data) => {
            let {timeTotal} = data
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            setStage({type: 'wrong_answer'})
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
            navigate('/match/player/hall', {replace: false})
        })
        return () => {
            
        }
    }, [])

    const handleAnswer = (index) => {
        let me = findMe()
        if (me._id == undefined) return 
        let answerTime = question.time_limt - time
        socket.emit('match:answer', pinCode, me, index, answerTime)
    }

    const findMe = () => {
        let player = match.players.find((item, index) => item._id == socket.id) 
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
                time = {time}
                timeTotal = {timeTotal}/>
            {
                stage.type == 'on_question' ?
                <div className = {classes.questionContainer}>
                    <Question 
                        question = {question} 
                        time = {time}
                        onAnswer = {handleAnswer}
                        answer_counts = {answer_counts}
                        question_index = {questionIndex}
                        question_total = {match.game.questions.length}/>
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
