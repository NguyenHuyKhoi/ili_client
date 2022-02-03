import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
import HeaderBar from '../../../../component/HeaderBar'
import SideMenu from '../../../../component/SideMenu'
import Tabbar from '../../../../component/Tabbar'
import { AuthContext } from '../../../../context/auth/context'
import { getCollectionsSuccess } from '../../../../context/collection/actions'
import { QUESTION_TYPES_ID } from '../../../../context/question/creator/context'
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

var tabs = [
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

    const {token} = useContext(AuthContext)
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        getQuestions({
            source: 'bank',
            type: QUESTION_TYPES_ID.MULTIPLE_CHOICE
        })
        return () => {
            
        }
    }, [])

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
        })
        .finally(() => {
            setIsFetching(false)
        }
        )
    }

    const handleSelectTab = (index) => {
        if (isFetching == true) return
        setIndex(index)
        getQuestions({
            source: 'bank',
            type: tabs[index].typeId
        })
    }

    const handleCreate = () => {
        return navigate('game/creator', {replace: false})
    }

    return (
        <div className = {classes.container}>
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
                                tabs = {tabs.map((item) => item.label)}
                                selectedIndex = {index}
                                onClickTab = {handleSelectTab}/>
                            <Button 
                                variant= 'primary' 
                                onClick = {handleCreate}
                                label = {'Create one'}/>
                        </div>
                        
                        <QuestionList questions = {questions}/>
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminQuestionManagePage
