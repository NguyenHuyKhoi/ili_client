import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationModal from '../../../component/NotificationModal'
import { AuthContext } from '../../../context/auth/context'
import { updateGameSetting } from '../../../context/game/creator/actions'
import { GameCreatorContext } from '../../../context/game/creator/context'
import { validateGameSetting } from '../../../context/game/creator/reducer'
import { DEFECTIVE_CHECK_TYPES, QuestionCreatorContext, QUESTION_TYPES_ID } from '../../../context/question/creator/context'
import { cloneQuestion } from '../../../context/question/creator/reducer'
import FirebaseHelper, { IMAGE_CATEGORIES } from '../../../firebase'
import QuestionCreator from './component/QuestionCreator'
import SettingModal from './component/SettingModal'
import Topbar from './component/Topbar'
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

    const {game, mode, dispatch} = useContext(GameCreatorContext)

    const {defectiveQuestions, showDefectives, questions} = useContext(QuestionCreatorContext)
    const [modal, setModal] = useState({})
    const [alert, setAlert] = useState({})

    const handleExit= () => {
        navigate('/game/library')
    }

    const uploadQuestionImages = async (game) => {
        // Lose all file-type properties
        var res = JSON.parse(JSON.stringify(game))
        await Promise.all(game.questions.map(async(question, questionIdx) => {
            switch (question.typeId) {

                case QUESTION_TYPES_ID.MULTIPLE_CHOICE: 
                case QUESTION_TYPES_ID.TF_CHOICE: 
                    res.questions[questionIdx].image = await FirebaseHelper.uploadImage(question.image, IMAGE_CATEGORIES.QUESTION_IMAGE)
                    break;

                case QUESTION_TYPES_ID.PIC_WORD:
                    res.questions[questionIdx].images[0] = await FirebaseHelper.uploadImage(question.images[0], IMAGE_CATEGORIES.QUESTION_IMAGE)
                    res.questions[questionIdx].images[1] = await FirebaseHelper.uploadImage(question.images[1], IMAGE_CATEGORIES.QUESTION_IMAGE)
                    res.questions[questionIdx].images[2] = await FirebaseHelper.uploadImage(question.images[2], IMAGE_CATEGORIES.QUESTION_IMAGE)
                    res.questions[questionIdx].images[3] = await FirebaseHelper.uploadImage(question.images[3], IMAGE_CATEGORIES.QUESTION_IMAGE)
                   
                    break; 
                case QUESTION_TYPES_ID.WORD_TABLE: 
                    break;
                default: 
                    break;
            }
        }))
        return res
    }
    const handleSave = async () => {
        if (showDefectives == DEFECTIVE_CHECK_TYPES.NOT_CHECK) {
            setAlert({
                type: 'error',
                msg: 'Please check all questions before'
            })
            return 
        }
        if (defectiveQuestions.length > 0) {
            setAlert({
                type: 'error',
                msg: 'Please fix all questions before.'
            })
            return 
        }
        var isValidated = validateGameSetting(game)
        if (!isValidated) {
            setModal({state: 'setting'})
        }
        else if (mode === 'create') {
            // Add index for question:
            game.questions = questions.map((question, index) => ({
                ...cloneQuestion(question), 
                index: index + 1
            }))

            console.log("Game questions: ", game.questions);
            var { cover} = game 
            var coverUrl =  await FirebaseHelper.uploadImage(cover, IMAGE_CATEGORIES.GAME_COVER) 

            var tempGame = await uploadQuestionImages(game)


            axios.post('game/create', {
                ...tempGame,
                cover: coverUrl
            }, {
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
        else if (mode === 'edit') {
            console.log("Edit game success")
            game.questions = questions.map((question, index) => ({
                ...cloneQuestion(question),
                index: index + 1
            }))
            let { cover} = game 
            let coverUrl =  await FirebaseHelper.uploadImage(cover, IMAGE_CATEGORIES.GAME_COVER) 
            let tempGame = await uploadQuestionImages(game)
            axios.post('game/edit/'+game._id, {
                ...tempGame,
                cover: coverUrl
            }, {
            headers: {
                'x-access-token': token
            }
        })    
        .then(() => {
                setModal({state: 'success'})
            })
        }
    }

    const handleDoneCreate = () => {
        setModal({})
        navigate('/game/library', {replace: true})
    }

    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type !== undefined} autoHideDuration={5000} onClose={() => setAlert({})}
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
                open = { modal.state === 'success' }     
                onClose = {() => setModal({})}
                onDone = {handleDoneCreate}/>

            <SettingModal 
                setting = {{
                    title: game.title,
                    description: game.description,
                    cover: game.cover,
                    visibility: game.visibility,
                    subject: game.subject
                }}
                open = {modal.state === 'setting'}     

                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onDone = {(setting) => {
                    setModal({})
                    dispatch(updateGameSetting(setting))
                }}/>
            <QuestionCreator/>
        </div>
    )
}

export default GameCreatorPage
