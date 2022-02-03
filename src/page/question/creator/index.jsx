import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationModal from '../../../component/NotificationModal'
import { AuthContext } from '../../../context/auth/context'
import { DEFECTIVE_CHECK_TYPES, QuestionCreatorContext, QUESTION_TYPES_ID } from '../../../context/question/creator/context'
import FirebaseHelper, { IMAGE_CATEGORIES } from '../../../firebase'
import QuestionBuilder from './component/QuestionBuilder'
import Topbar from './component/Topbar'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor:'white',
        overflow: 'hidden'
    }
}))

const QuestionCreatorPage = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {token} = useContext(AuthContext)

    const {defectiveQuestions, showDefectives, questions, isEditMode} = useContext(QuestionCreatorContext)
    const [modal, setModal] = useState({})
    const [alert, setAlert] = useState({})

    const handleExit= () => {
        navigate('/game/library')
    }

    const uploadQuestionImages = async (questions) => {
        var res = [...questions]
        // Lose all file-type properties
        await Promise.all(questions.map(async(question, questionIdx) => {
            switch (question.typeId) {
                case QUESTION_TYPES_ID.MULTIPLE_CHOICE: 
                case QUESTION_TYPES_ID.TF_CHOICE: 
                    res[questionIdx].image = await FirebaseHelper.uploadImage(question.image, IMAGE_CATEGORIES.QUESTION_IMAGE)
                    break;

                case QUESTION_TYPES_ID.PIC_WORD:
                    res[questionIdx].images[0] = await FirebaseHelper.uploadImage(question.images[0], IMAGE_CATEGORIES.QUESTION_IMAGE)
                    res[questionIdx].images[1] = await FirebaseHelper.uploadImage(question.images[1], IMAGE_CATEGORIES.QUESTION_IMAGE)
                    res[questionIdx].images[2] = await FirebaseHelper.uploadImage(question.images[2], IMAGE_CATEGORIES.QUESTION_IMAGE)
                    res[questionIdx].images[3] = await FirebaseHelper.uploadImage(question.images[3], IMAGE_CATEGORIES.QUESTION_IMAGE)
                   
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
        var tempQuestions = []
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
        if (isEditMode == false) {
            // Upload new questions
            // Add index for question:


            tempQuestions = await uploadQuestionImages(questions)
            axios.post('question/create', 
            tempQuestions, 
                {
                    headers: {
                        'x-access-token': token
                    }
                })   
            .then (() => {
                setModal({state: 'success'})
                console.log("Create questions success")
            })
            .catch(() => {
                setAlert({
                    type: 'error',
                    msg: 'Some thing wrong, try again later...'
                })
            })
        }
        else {
            console.log("Edit game success")
        
            // only one question in edit mode
            tempQuestions = await uploadQuestionImages(questions)
            var question = tempQuestions[0]
            axios.post('question/edit/'+question._id, question, {
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
        return navigate('/admin/manage/question', {replace: true})
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
            <QuestionBuilder/>
        </div>
    )
}

export default QuestionCreatorPage
