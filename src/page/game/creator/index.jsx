import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/context'
import { deleteQuestion, duplicateQuestion, selectQuestion, updateGameSetting, validateGame } from '../../../context/game/creator/actions'
import { GameCreatorContext } from '../../../context/game/creator/context'
import { theme } from '../../../theme'
import DeleteQuestionModal from './component/DeleteQuestionModal'
import QuestionBuilder from './component/QuestionBuilder'
import QuestionConfig from './component/QuestionConfig'
import QuestionList from './component/QuestionList'
import SettingModal from './component/SettingModal'
import SuccessModal from './component/SuccessModal'
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

const GameCreatorPage = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {token} = useContext(AuthContext)
    const {game, dispatch, mode} = useContext(GameCreatorContext)
    const {questions, questionIndex, isValidated} = game

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
        else if (mode == 'create') {
            console.log("Token :", token)
            // Add index for question:
            game.questions.forEach((question, index) => game.questions[index].index = index + 1)
            axios.post('game/', game, {
                headers: {
                    'x-access-token': token
                }
            })   
            .then (() => {
                setModal({state: 'success'})
            })
        }
        else if (mode == 'edit') {
            axios.put('game/'+game._id, game, {
               headers: {
                   'x-access-token': token
               }
           })    
           .then (() => {
                setModal({state: 'success'})
            })
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

    const handleDoneCreate = () => {
        setModal({})
        navigate('/game/library', {replace: true})
    }

    return (
        <div className = {classes.container}>
            <Topbar 
                onSetting = {() => setModal({state: 'setting'})}
                onSave = {handleSave}
                onExit = {handleExit}
                />
            <SuccessModal 
               open = { modal.state == 'success' }     
                onClose = {() => setModal({})}
                onDone = {handleDoneCreate}/>

            <SettingModal 
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
                    if (canDeleteQuestion) dispatch(deleteQuestion(questionIndex))
                }}/>

            <Grid container sx = {{pt: theme.spacing(7), flex: 1}}>
                <Grid item sm={1.7} >
                    <QuestionList/>
                </Grid>
                <Grid item sm={8.3}>
                    <QuestionBuilder/>
                </Grid>
                <Grid item sm={2}>
                    <QuestionConfig onClickDelete = {() => setModal({state: 'delete_question'})}
                        onClickDuplicate = {() => dispatch(duplicateQuestion(questionIndex))}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameCreatorPage
