import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTION_TYPES_ID } from '../../../../context/game/creator/context'
import { updateMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import BottomBar from './component/BottomBar'
import Header from './component/Header'
import MultipleChoiceQuestion from './component/MultipleChoiceQuestion'
import Question from './component/MultipleChoiceQuestion'
import PicWordQuestion from './component/PicWordQuestion'
import QuestionEnd from './component/QuestionEnd'
import Scoreboard from './component/Scoreboard'
import TFChoiceQuestion from './component/TFChoiceQuestion'
import WordTableQuestion from './component/WordTableQuestion'
import WordTableQuestionEnd from './component/WordTableQuestionEnd'
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
    const [stage, setStage] = useState({type: 'end_question'})
    const [time, setTime] = useState(0)
    const [timeTotal, setTimeTotal] = useState(question.time_limit)
    const {questionIndex, pinCode, players} = match

    console.log("match :", match);

    useEffect(() => {
        setTimeTotal(question.time_limit)
        socket.on('match:onCountdown', (data) => {
            let {time} = data
            //console.log("Receive emit on countdown: ",  time)
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

    const renderQuestionEnd = () => {
        var data = {
            question,
            time,
            answer_counts
        }
        var stage = match.progress[match.progress.length - 1]
        console.log("Render question end: ", stage.open_word_states);
        switch (question.typeId) {
            case  QUESTION_TYPES_ID.MULTIPLE_CHOICE :
            case QUESTION_TYPES_ID.TF_CHOICE :
            case QUESTION_TYPES_ID.PIC_WORD :
                return  <QuestionEnd  data = {data} />

            case QUESTION_TYPES_ID.WORD_TABLE :
                return <WordTableQuestionEnd
                    data = {{...data, open_word_states: stage.open_word_states, userAnswers: stage.answers}} />
            default:
                return null 
        }
    }

    const renderQuestion = () => {
        var data = {
            question,
            time,
            answer_counts,
            question_index :questionIndex,
            question_total : match.game.questions.length
        }
        var stage = match.progress[match.progress.length - 1]
        switch (question.typeId) {
            case  QUESTION_TYPES_ID.MULTIPLE_CHOICE :
                return  <MultipleChoiceQuestion 
                    data = {data} />
            case QUESTION_TYPES_ID.TF_CHOICE :
                return <TFChoiceQuestion
                    data = {data}/>
            case QUESTION_TYPES_ID.PIC_WORD :
                return <PicWordQuestion
                    data = {data} />
            case QUESTION_TYPES_ID.WORD_TABLE :
                return <WordTableQuestion
                    data = {{...data, open_word_states: stage.open_word_states, userAnswers: stage.answers}} />
            default:
                return null 
        }
    }
    return (
        <div className = {classes.container}>
            <Header
                time = {time}
                timeTotal = {timeTotal}/>
            <div className = {classes.questionContainer}>
                {
                    stage.type == 'end_question' ?
                    renderQuestionEnd()
                    :
                    stage.type == 'on_question' ?
                    renderQuestion()
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
