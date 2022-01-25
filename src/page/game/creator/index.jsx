import { Alert, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationModal from '../../../component/NotificationModal'
import { AuthContext } from '../../../context/auth/context'
import { addQuestion, deleteQuestion, duplicateQuestion, selectQuestion, updateGameSetting, updateQuestion } from '../../../context/game/creator/actions'
import { GameCreatorContext, QUESTION_TYPES_ID } from '../../../context/game/creator/context'
import { cloneQuestion, validateGameSetting, validateQuestion } from '../../../context/game/creator/reducer'
import FirebaseHelper, { IMAGE_CATEGORIES } from '../../../firebase'
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
import WordTableQuestionBuilder from './component/WordTableQuestionBuilder'
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
    const {questions, questionIndex} = game

    var question = questions[questionIndex]

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
        var isValidated = validateGameSetting(game)
        var qs = []
        questions.forEach((item, index) => {
            let cloned = cloneQuestion(item)
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
        else if (mode === 'create') {
            // Add index for question:
            game.questions.forEach((question, index) => game.questions[index].index = index + 1)

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

    const handleUpdateQuestion = (ques) => {
        dispatch(updateQuestion(question, questionIndex))
    }

    const renderBuilder = () => {

        switch (question.typeId) {
            case  QUESTION_TYPES_ID.MULTIPLE_CHOICE :
                return  <MultipleChoicesQuestionBuilder 
                    question = {question} 
                    onChange = {handleUpdateQuestion}/>
            case QUESTION_TYPES_ID.TF_CHOICE :
                return <TFChoicesQuestionBuilder
                    question = {question} 
                    onChange = {handleUpdateQuestion}/>
            case QUESTION_TYPES_ID.PIC_WORD :
                return <PicWordQuestionBuilder
                    question = {question} 
                    onChange = {handleUpdateQuestion}/>
            case QUESTION_TYPES_ID.WORD_TABLE :
                return <WordTableQuestionBuilder
                    question = {question} 
                    onChange = {handleUpdateQuestion}/>
            default:
                return null 
        }
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

            <SelectQuestionTypeModal 
                open = { modal.state === 'select_type' }     
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
                open = {modal.state === 'setting'}     

                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onDone = {(setting) => {
                    setModal({})
                    dispatch(updateGameSetting(setting))
                }}/>

            <ValidateGameModal
                open = {modal.state === 'validate'}    
                questions = {defectiveQuestions}
                onClickQuestion = {handleSelectFixQuestion} 
                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onSaveDraft = {handleSaveDraft}/>

            <DeleteQuestionModal 
                open = {modal.state === 'delete_question'}     
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
                        renderBuilder()
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
