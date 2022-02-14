import { Alert, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { addEmptyQuestion, addQuestionFromBank, deleteQuestion, duplicateQuestion, selectQuestion, showDefectiveQuestions, updateDefectiveQuestions, updateQuestion } from '../../../../context/question/creator/actions'
import { DEFECTIVE_CHECK_TYPES, QuestionCreatorContext, QUESTION_TYPES_ID } from '../../../../context/question/creator/context'
import { cloneQuestion, validateQuestion } from '../../../../context/question/creator/reducer'
import DeleteQuestionModal from './DeleteQuestionModal'
import MultipleChoicesQuestionBuilder from './MultipleChoicesQuestionBuilder'
import PicWordQuestionBuilder from './PicWordQuestionBuilder'
import QuestionConfig from './QuestionConfig'
import MiniQuestionList from './MiniQuestionList'
import SelectNewQuestionModal from './SelectNewQuestionModal'
import TFChoicesQuestionBuilder from './TFChoicesQuestionBuilder'
import ValidateQuestionModal from './ValidateQuestionModal'
import WordTableQuestionBuilder from './WordTableQuestionBuilder'
import { theme } from '../../../../theme'
import ImportTemplateModal from './ImportTemplateModal'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor:'white',
        overflow: 'hidden'
    }
}))

const QuestionBuilder = (props) => {
    const classes = useStyles()
    
    const {questions, questionIndex,defectiveQuestions, dispatch, showDefectives, isEditMode} = useContext(QuestionCreatorContext)

    useEffect(() => {
        console.log("Show defectives has change:", showDefectives)
        if (showDefectives == DEFECTIVE_CHECK_TYPES.CHECK_AND_SHOW) {
            handleShowDefectiveQuestions()
        }
    
        return () => {
        };
    }, [showDefectives]);
    
    var question = questionIndex != null && questions.length > 0 ? questions[questionIndex] : {}

    const [canDeleteQuestion, setCanDeleteQuestion] = useState(false)
    const [modal, setModal] = useState({})
    const [alert, setAlert] = useState({})
    useEffect(() => {
        setCanDeleteQuestion((questions.length > 1))
        return () => {
            
        }
    }, [questions.length])

    const handleShowDefectiveQuestions = () => {
        var qs = []
        questions.forEach((item, index) => {
            let cloned = cloneQuestion(item)
            console.log("Cloned question: ", item, cloned)
            let defects = validateQuestion(cloned)
            if (defects.length > 0) {
                cloned.defectives = defects
                console.log("Defective questions:", cloned)
                qs.push(cloned)
            }
        })
        dispatch(updateDefectiveQuestions(qs))
        if (qs.length > 0) {
            setModal({state: 'validate'})
        }
    }

    const handleSelectFixQuestion = (index) => {
        setModal({})
        console.log("Select question: ", index)
        dispatch(selectQuestion(index))
        dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.CHECK_AND_UNSHOW))
    }

    const handleSelectQuestionType = (id) => {
        console.log("Select question type", id);
        dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.NOT_CHECK))
        dispatch(addEmptyQuestion(id))
        setModal({})
    }

    const handleClickAdd = () => {
        setModal({state: 'select_type'})
    }

    const handleUpdateQuestion = (ques) => {
        dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.NOT_CHECK))
        dispatch(updateQuestion(question, questionIndex))
    }

    const handleAddQuestion = (question) => {
        dispatch(addQuestionFromBank(question))
        setAlert({
            type: 'success',
            msg: 'Add Question successfully'
        })
    }

    const renderBuilder = () => {
        console.log("Question: ", question)
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

    const handleImportTemplate = () => {
        setModal({state: 'import_template'})
    }

    const handleUploadTemplate = () => {

    }
    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type !== undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
            <ImportTemplateModal 
                open = { modal.state === 'import_template' }     
                onClose = {() => setModal({})}
                onUpload = {handleUploadTemplate}/>
            <SelectNewQuestionModal 
                open = { modal.state === 'select_type' }     
                onClose = {() => setModal({})}
                onAddQuestion = {handleAddQuestion}
                onSelectType = {handleSelectQuestionType}/>

            <ValidateQuestionModal
                open = {modal.state === 'validate'}    
                questions = {defectiveQuestions}
                onClickQuestion = {handleSelectFixQuestion} 
                onClose = {() => {
                    setModal({})
                    dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.CHECK_AND_UNSHOW))
                }}/>

            <DeleteQuestionModal 
                open = {modal.state === 'delete_question'}     
                canDelete = {canDeleteQuestion}
                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onDone = {() => {
                    setModal({})
                    if (canDeleteQuestion) {
                        dispatch(deleteQuestion(questionIndex))
                        dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.NOT_CHECK))
                    }
                }}/>

            <Grid container sx = {{pt: theme.spacing(7), flex: 1}}>
                <Grid item sm={1.7} >
                    <MiniQuestionList 
                        onAdd = {handleClickAdd}
                        onImportTemplate = {handleImportTemplate} />
                </Grid>
                <Grid item sm={8.3}>
                    {
                        renderBuilder()
                    }
                </Grid>
                <Grid item sm={2}>
                    <QuestionConfig 
                        onClickDelete = {() => setModal({state: 'delete_question'})}
                        onClickDuplicate = {() => {
                            dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.NOT_CHECK))
                            dispatch(duplicateQuestion(questionIndex))
                        }}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default QuestionBuilder
