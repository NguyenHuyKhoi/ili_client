import { Alert, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationModal from '../../../component/NotificationModal'
import { AuthContext } from '../../../context/auth/context'
import { addQuestion, deleteQuestion, duplicateQuestion, selectQuestion, updateGameSetting, validateGame } from '../../../context/game/creator/actions'
import { GameCreatorContext, QUESTION_TYPES_ID } from '../../../context/game/creator/context'
import { validateGameSetting, validateQuestion } from '../../../context/game/creator/reducer'
import { theme } from '../../../theme'
import DeleteQuestionModal from './component/DeleteQuestionModal'
import MultipleChoicesQuestionBuilder from './component/MultipleChoicesQuestionBuilder'
import PicWordQuestionBuilder from './component/PicWordQuestionBuilder'
import QuestionConfig from './component/QuestionConfig'
import QuestionList from './component/QuestionList'
import SelectQuestionTypeModal from './component/SelectQuestionTypeModal'
import SettingModal from './component/SettingModal'
import TFChoicesQuestionBuilder from './component/TFChoicesQuestionBuilder'
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
    const {game, dispatch, mode, questionType} = useContext(GameCreatorContext)
    const {questions, questionIndex, isValidated} = game

    const [canDeleteQuestion, setCanDeleteQuestion] = useState(false)
    const [defectiveQuestions, setDefectiveQuestions] = useState([])
    const [modal, setModal] = useState({})
    const [alert, setAlert] = useState({})
    useEffect(() => {
        setCanDeleteQuestion((questions.length > 1))
        return () => {
            
        }
    }, [questions.length])

    const handleExit= () => {
        navigate('/game/library')
    }

    const handleSave = async () => {
        var isValidated = validateGameSetting(game)
        var qs = []
        questions.forEach((item, index) => {
            let cloned = JSON.parse(JSON.stringify(item))
            let defects = validateQuestion(cloned)
            if (defects.length > 0) {
                cloned.defectives = defects

                console.log("Defective questions:", cloned)
                qs.push(cloned)
            }
        })
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
            axios.post('game/create', game, {
                headers: {
                    'x-access-token': token
                }
            })   
            .then (() => {
                setModal({state: 'success'})
                console.log("Create game success")
            })
            .catch(() => {
                setAlert({
                    type: 'error',
                    msg: 'Some thing wrong, try again later...'
                })
            })
        }
        else if (mode == 'edit') {
            console.log("Edit game success")
            axios.post('game/edit/'+game._id, game, {
            headers: {
                'x-access-token': token
            }
        })    
        .then(() => {
                setModal({state: 'success'})
            })
        }
    }
    const handleSaveDraft = () => {
        setModal({})
        navigate('/game/library')
    }
    const handleSelectFixQuestion = (index) => {
        console.log("Handle select fix question:", index)
        setModal({})
        dispatch(selectQuestion(index))
    }

    const handleDoneCreate = () => {
        setModal({})
        navigate('/game/library', {replace: true})
    }

    const handleSelectQuestionType = (id) => {
        console.log("Select question type", id);
        dispatch(addQuestion(id))
        setModal({})
    }

    const handleClickAdd = () => {
        setModal({state: 'select_type'})
    }

    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type != undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
            <Topbar 
                onSetting = {() => setModal({state: 'setting'})}
                onSave = {handleSave}
                onExit = {handleExit}
                />
            <NotificationModal 
                title = 'Done!'
                btnLabel = 'Go Library'
                desc = 'See results in library.'
                open = { modal.state == 'success' }     
                onClose = {() => setModal({})}
                onDone = {handleDoneCreate}/>

            <SelectQuestionTypeModal 
                open = { modal.state == 'select_type' }     
                onClose = {() => setModal({})}
                onSelectType = {handleSelectQuestionType}/>

            <SettingModal 
                setting = {{
                    title: game.title,
                    description: game.description,
                    cover: game.cover,
                    visibility: game.visibility,
                    subject: game.subject
                }}
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
                    <QuestionList onAdd = {handleClickAdd} />
                </Grid>
                <Grid item sm={8.3}>
                    {
                        questionType == QUESTION_TYPES_ID.MULTIPLE_CHOICE ? <MultipleChoicesQuestionBuilder/>
                        : questionType == QUESTION_TYPES_ID.TF_CHOICE ? <TFChoicesQuestionBuilder/>
                        : questionType == QUESTION_TYPES_ID.PIC_WORD ? <PicWordQuestionBuilder/>
                        : questionType == QUESTION_TYPES_ID.WORD_TABLE ? 'Word table'
                        : 'Not type'
                    }
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
