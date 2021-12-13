import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteQuestion, duplicateQuestion, selectQuestion, updateGameSetting, validateGame } from '../../../context/game/create/actions'
import { GameCreatorContext } from '../../../context/game/create/context'
import { theme } from '../../../theme'
import DeleteQuestionModal from './component/DeleteQuestionModal'
import GameSettingModal from './component/GameSettingModal'
import QuestionBuilder from './component/QuestionBuilder'
import QuestionConfig from './component/QuestionConfig'
import QuestionList from './component/QuestionList'
import Topbar from './component/Topbar'
import ValidateGameModal from './component/ValidateGameModal'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor:'white',
        overflow: 'hidden'
    }
}))

const GameCreatePage = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {game, dispatch} = useContext(GameCreatorContext)
    const {questions, question_index, isValidated} = game

    const [canDeleteQuestion, setCanDeleteQuestion] = useState(false)
    const [defectiveQuestions, setDefectiveQuestions] = useState([])
    const [modal, setModal] = useState({})

    useEffect(() => {
        setCanDeleteQuestion((questions.length > 1))
        return () => {
            
        }
    }, [questions.length])

    const handleExit= () => {
        navigate('/game/library')
    }

    const handleSave = async () => {
        await dispatch(validateGame())

        let qs = questions.filter((item, index) => item.defectives!= undefined && item.defectives.length > 0)
        setDefectiveQuestions(qs)
        if (qs.length > 0) {
            setModal({state: 'validate'})
        }
        else if (!isValidated) {
            setModal({state: 'setting'})
        }
        else {
            navigate('/game/library', {replace: false})
        }
    }
    const handleSaveDraft = () => {
        setModal({})
        navigate('/game/library')
    }
    const handleSelectFixQuestion = (index) => {
        setModal({})
        dispatch(selectQuestion(index))
    }

    return (
        <div className = {classes.container}>
            <Topbar 
                onSetting = {() => setModal({state: 'setting'})}
                onSave = {handleSave}
                onExit = {handleExit}
                />
            <GameSettingModal 
                setting = {game}
                open = {modal.state == 'setting'}     
                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onDone = {(setting) => {
                    setModal({})
                    dispatch(updateGameSetting(setting))
                }}/>

            <ValidateGameModal
                open = {modal.state == 'validate'}    
                questions = {defectiveQuestions}
                onClickQuestion = {handleSelectFixQuestion} 
                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onSaveDraft = {handleSaveDraft}/>

            <DeleteQuestionModal 
                open = {modal.state == 'delete_question'}     
                canDelete = {canDeleteQuestion}
                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onDone = {() => {
                    setModal({})
                    if (canDeleteQuestion) dispatch(deleteQuestion(question_index))
                }}/>

            <Grid container sx = {{pt: theme.spacing(8), flex: 1}}>
                <Grid item sm={1.5} >
                    <QuestionList/>
                </Grid>
                <Grid item sm={8}>
                    <QuestionBuilder/>
                </Grid>
                <Grid item sm={2.5}>
                    <QuestionConfig onClickDelete = {() => setModal({state: 'delete_question'})}
                        onClickDuplicate = {() => dispatch(duplicateQuestion(question_index))}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameCreatePage
