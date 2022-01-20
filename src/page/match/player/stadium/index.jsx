import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext, useEffect, useState} from 'react'
import Timesup from './component/Timesup'
import BottomBar from './component/BottomBar'
import Correct from './component/Correct'
import Incorrect from './component/Incorrect'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import { updateMatch } from '../../../../context/match/play/actions'
import { useNavigate } from 'react-router-dom'
import Scoreboard from '../../host/stadium/component/Scoreboard'
import Header from '../../host/stadium/component/Header'
import Question from '../../host/stadium/component/MultipleChoiceQuestion'
import { QUESTION_TYPES_ID } from '../../../../context/game/creator/context'
import WordTableQuestion from '../../host/stadium/component/WordTableQuestion'
import PicWordQuestion from '../../host/stadium/component/PicWordQuestion'
import TFChoiceQuestion from '../../host/stadium/component/TFChoiceQuestion'
import MultipleChoiceQuestion from '../../host/stadium/component/MultipleChoiceQuestion'
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
            //console.log("Receive emit on countdown: ",  time)
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
            navigate('/match/player/hall', {replace: true})
        })
        return () => {
            
        }
    }, [])

    const handleAnswer = (answer) => {
        let me = findMe()
        if (me._id == undefined) return 
        let answerTime = question.time_limit - time
        console.log("Client send answer: ", answer, time);
        socket.emit('match:answer', pinCode, me, answer, answerTime)
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
    const renderQuestion = () => {
        console.log("Answer count: ", answer_counts);
        var data = {
            question,
            time,
            answer_counts,
            question_index :questionIndex,
            question_total : match.game.questions.length,
            isPlayer: true
        }
        switch (question.typeId) {
            case  QUESTION_TYPES_ID.MULTIPLE_CHOICE :
                return  <MultipleChoiceQuestion 
                    onAnswer = {handleAnswer}
                    data = {data} />
            case QUESTION_TYPES_ID.TF_CHOICE :
                return <TFChoiceQuestion
                    onAnswer = {handleAnswer}
                    data = {data}/>
            case QUESTION_TYPES_ID.PIC_WORD :
                return <PicWordQuestion
                    onAnswer = {handleAnswer}
                    data = {data} />
            case QUESTION_TYPES_ID.WORD_TABLE :
                return <WordTableQuestion
                    data = {data}/>
            default:
                return null 
        }
    }

    const getCorrectAnswer = () => {
        // For only nultichoi/TF/Picword
        var correct_answer = question.correct_answer
        if (question.typeId == QUESTION_TYPES_ID.MULTIPLE_CHOICE) {
                return ['A','B','C','D'][correct_answer]
            }
        if (question.typeId == QUESTION_TYPES_ID.TF_CHOICE) {
            return ['True', 'False'][correct_answer]
        }
        return correct_answer
    }
    return (
        <div className = {classes.container}>
            <Header
                time = {time}
                timeTotal = {timeTotal}/>
            {
                stage.type == 'on_question' ?
                renderQuestion()
                : stage.type == 'not_answer'? 
                <Timesup/>
                : stage.type == 'correct_answer'?
                <Correct earnScore = {earnScore}/>
                : stage.type == 'wrong_answer' ?
                <Incorrect correct_answer = {getCorrectAnswer()}/>
                : stage.type == 'scoreboard' ?
                <Scoreboard time = {time} players = {players}/>
                : null
            }
            <BottomBar player = {findMe()}/>
        </div>
    )
}

export default MatchPlayerStadiumPage
