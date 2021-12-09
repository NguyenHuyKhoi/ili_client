import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext, useState, useEffect} from 'react'
import GameSettingModal from './components/GameSettingModal'
import QuestionBuilder from './components/QuestionBuilder'
import QuestionConfig from './components/QuestionConfig'
import QuestionList from './components/QuestionList'
import Topbar from './components/Topbar'
import {theme} from '../../theme'
import DeleteQuestionModal from './components/DeleteQuestionModal'
import { GameCreatorContext } from '../../contexts/game_creator/context'
import { deleteQuestion, duplicateQuestion, updateGameSetting, selectQuestion, validateGame } from '../../contexts/game_creator/actions'
import ValidateGameModal from './components/ValidateGameModal'
import { Navigate , useNavigate} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor:'white',
        overflow: 'hidden'
    }
}))

const GameCreator = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {game, dispatch} = useContext(GameCreatorContext)
    const {questions, question_index, isValidated} = game
    const [openSettingModal, setOpenSettingModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openValidateModal, setOpenValidateModal] = useState(false)
    const [canDeleteQuestion, setCanDeleteQuestion] = useState(false)
    const [defectiveQuestions, setDefectiveQuestions] = useState([])
    useEffect(() => {
        setCanDeleteQuestion((questions.length > 1))
        return () => {
            
        }
    }, [questions.length])
    const handleExit= () => {
        navigate('/my-library')
    }
    const handleSave = async () => {
        await dispatch(validateGame())

        let qs = questions.filter((item, index) => item.defectives!= undefined && item.defectives.length > 0)
        setDefectiveQuestions(qs)
        if (qs.length > 0) {
            setOpenValidateModal(true)
        }
        else if (!isValidated) {
            setOpenSettingModal(true)
        }
        else {
            navigate('/my-library', {replace: true})
        }
    }
    //Setting modal
    const handleOpenSettingModal = () => {
        setOpenSettingModal(true)
    }

    const handleCancelSettingModal= () => {
        setOpenSettingModal(false)
    }
    const handleDoneSettingModal = (setting) => {
        setOpenSettingModal(false)
        console.log("Update game setting: ", setting)
        dispatch(updateGameSetting(setting))
    }

    const handleCloseSettingModal = () => {
        setOpenSettingModal(false)
    }

    // Delete Modal
    const handleOpenDeleteModal= () => {
        setOpenDeleteModal(true)
    }

    const handleCancelDeleteModal = () => {
        setOpenDeleteModal(false)
    }
    const handleDoneDeleteModal = () => {
        setOpenDeleteModal(false)
        if (canDeleteQuestion) {
            dispatch(deleteQuestion(question_index))
        }
    }
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    //Validate Modal
    const handleOpenValidateModal = () => {
        setOpenValidateModal(true)
    }

    const handleCancelValidateModal = () => {
        setOpenValidateModal(false)
    }
    const handleSaveDraft = () => {
        setOpenValidateModal(false)
        navigate('/my-library')
    }
    const handleCloseValidateModal = () => {
        setOpenValidateModal(false)
    }
    const handleSelectFixQuestion = (index) => {
        setOpenValidateModal(false)
        dispatch(selectQuestion(index))
    }

    ////
    const handleDuplicateQuestion = () => {
        dispatch(duplicateQuestion(question_index))
    }


    return (
        <div className = {classes.container}>
            <Topbar 
                onClickSetting = {handleOpenSettingModal}
                onClickSave = {handleSave}
                onClickExit = {handleExit}
                />
            <GameSettingModal 
                setting = {game}
                open = {openSettingModal}     
                onClose = {handleCloseSettingModal}
                onClickCancel = {handleCancelSettingModal}
                onClickDone = {handleDoneSettingModal}/>

            <ValidateGameModal
                open = {openValidateModal}    
                questions = {defectiveQuestions}
                onClickQuestion = {handleSelectFixQuestion} 
                onClose = {handleCloseValidateModal}
                onClickCancel = {handleCancelValidateModal}
                onClickSaveDraft = {handleSaveDraft}/>

            <DeleteQuestionModal 
                open = {openDeleteModal}     
                canDelete = {canDeleteQuestion}
                onClose = {handleCloseDeleteModal}
                onClickCancel = {handleCancelDeleteModal}
                onClickDone = {handleDoneDeleteModal}/>
            <Grid container sx = {{pt: theme.spacing(8), flex: 1}}>
                <Grid item sm={1.5} >
                    <QuestionList/>
                </Grid>
                <Grid item sm={8}>
                    <QuestionBuilder/>
                </Grid>
                <Grid item sm={2.5}>
                    <QuestionConfig onClickDelete = {handleOpenDeleteModal}
                        onClickDuplicate = {handleDuplicateQuestion}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameCreator
