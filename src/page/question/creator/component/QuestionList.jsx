import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import IconButton from '../../../../component/IconButton'
import { theme } from '../../../../theme'
import {QuestionBankContext} from '../../../../context/question/other/context'
import QuestionRowItem from '../../../game/detail/component/QuestionRowItem'
import Tabbar from '../../../../component/Tabbar'
import { questionTypeTabs } from '../../../admin/manage/question'
import axios from 'axios'
import { getQuestionsSuccess } from '../../../../context/question/other/actions'
import { AuthContext } from '../../../../context/auth/context'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
        paddingTop: theme.spacing(2)
    },
    list: {
        display:'flex',
        flexDirection:'column',
        marginTop: theme.spacing(2)
    },
    item: {
        marginBottom: theme.spacing(3),
        display:'flex',
        flexDirection:'row'
    },
    header: {
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
}))


const QuestionList = (props) => {
    const classes = useStyles()
    const {token} = useContext(AuthContext)
    const {questions, dispatch} = useContext(QuestionBankContext)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isFetching, setIsFetching] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        getQuestions({
            source: 'bank',
            type: questionTypeTabs[tabIndex].typeId
        })
        
        return () => {
            ;
        };
    }, [tabIndex]);
    
    const handleAddItem = (item) => {
        if (props.onAddItem) {
            props.onAddItem(item)
        }
    }

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
        if (isFetching) return 
        setTabIndex(index)
    }

    return (
        <div className = {classes.container}>
            <Tabbar 
				tabs = {questionTypeTabs.map((item) => item.label)}
				selectedIndex = {tabIndex}
				onClickTab = {handleSelectTab}/>
            <div className = {classes.list} >
            {
                questions.map((item, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <QuestionRowItem 
                            question = {item} 
                            index = {index }
                            selected = {selectedIndex === index}
                            onSelect = {() => setSelectedIndex(index)}/>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: theme.spacing(2)}}>
                            <IconButton icon = 'Add' variant = 'primary' onClick = {() => handleAddItem(item)}/>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default QuestionList
