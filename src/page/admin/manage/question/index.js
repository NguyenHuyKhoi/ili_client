import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
import HeaderBar from '../../../../component/HeaderBar'
import NotificationModal from '../../../../component/NotificationModal'
import SideMenu from '../../../../component/SideMenu'
import Tabbar from '../../../../component/Tabbar'
import { AuthContext } from '../../../../context/auth/context'
import { initQuestions } from '../../../../context/question/creator/actions'
import { QuestionCreatorContext, QUESTION_TYPES, QUESTION_TYPES_ID } from '../../../../context/question/creator/context'
import { cloneQuestion } from '../../../../context/question/creator/reducer'
import { getQuestionsSuccess } from '../../../../context/question/other/actions'
import { QuestionBankContext } from '../../../../context/question/other/context'
import { theme } from '../../../../theme'
import { ADMIN_MANAGE_MENUS } from '../user'
import QuestionList from './component/QuestionList'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: theme.spacing(2)
    }
}))

export const questionTypeTabs = [
    {
        label: 'Multiple Choice',
        typeId: QUESTION_TYPES_ID.MULTIPLE_CHOICE
    },
    {
        label: 'True/False',
        typeId: QUESTION_TYPES_ID.TF_CHOICE
    },
    {
        label: '4 Pic 1 word',
        typeId: QUESTION_TYPES_ID.PIC_WORD
    },
    {
        label: 'Word Table',
        typeId: QUESTION_TYPES_ID.WORD_TABLE
    }
]

const AdminQuestionManagePage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [modal, setModal] = useState({})
    const [index, setIndex] = useState(0);
    const {questions, dispatch} = useContext(QuestionBankContext)

    const questionCreatorDispatch = useContext(QuestionCreatorContext).dispatch
    const {token} = useContext(AuthContext)
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        getQuestions({
            source: 'bank',
            type: questionTypeTabs[index].typeId
        })
        return () => {
            
        }
    }, [index])

    const getQuestions = (params) => {
        setIsFetching(true)
        axios.get('question/search', {
            headers: {
                'x-access-token': token
            },
            params
        }) 
        .then ((res) => {
            console.log("Get questions: ",res.data);
            dispatch(getQuestionsSuccess(res.data))
        })   
        .catch((err) => {
            console.log("Get questions error:", err);
            dispatch(getQuestionsSuccess([]))
        })
        .finally(() => {
            setIsFetching(false)
        }
        )
    }

    const handleDeleteQuestion = (question) => {
        axios.delete('question/' + question._id, {
            headers: {
                'x-access-token': token
            }
        })
        .then((res) => {
            setModal({
                state: 'success',
                title: 'Done !',
                desc: 'This question has been deleted',
                btnLabel: 'OK'
            })
            getQuestions({
                source: 'bank',
                type: questionTypeTabs[index].typeId
            })
        })   
        .catch((err) => {
            console.log("Err: ", err)
            setModal({
                state: 'success',
                title: 'Error !',
                desc: 'Try again, later',
                btnLabel: 'OK',
                variant: 'error'
            })
        })
    }

    const handleEditQuestion = (question) => {
        questionCreatorDispatch(initQuestions([{...question}], true))
        return navigate('/admin/question/creator', {replace: false})
    }

    const handleSelectTab = (index) => {
        if (isFetching == true) return
        setIndex(index)
    }

    const handleCreate = () => {
        questionCreatorDispatch(initQuestions([cloneQuestion(QUESTION_TYPES[0].sample)]))
        return navigate('/admin/question/creator', {replace: false})
    }

    return (
        <div className = {classes.container}>
             <NotificationModal 
                title = {modal.title}
                btnLabel = {modal.btnLabel}
                desc = {modal.desc}
                open = { modal.state ==='success' }     
                onClose = {() => setModal({})}
                onDone = {() => {
                    setModal({})
                }}/>
            <HeaderBar selectedIndex = {0}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu 
                        selectedIndex = {3}
                        menus = {ADMIN_MANAGE_MENUS}
                        onSelectItem = {() => {}}/>
                </Grid>
                <Grid item sm={10} sx = {{
                    backgroundColor: theme.palette.background.main, height: '92vh'
                }}>
                    <div className= {classes.body}>
                        <div className= {classes.header} >
                            <Tabbar 
                                tabs = {questionTypeTabs.map((item) => item.label)}
                                selectedIndex = {index}
                                onClickTab = {handleSelectTab}/>
                            <Button 
                                variant= 'primary' 
                                onClick = {handleCreate}
                                label = {'Create'}/>
                        </div>
                        
                        <QuestionList 
                            questions = {questions}
                            onDeleteItem = {handleDeleteQuestion}
                            onEditItem = {handleEditQuestion}
                            />
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminQuestionManagePage
