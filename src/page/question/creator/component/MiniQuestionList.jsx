import { Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import Button from '../../../../component/Button'
import { selectQuestion } from '../../../../context/question/creator/actions'
import { QuestionCreatorContext, QUESTION_TYPES_ID } from '../../../../context/question/creator/context'
import { theme } from '../../../../theme'
import MultipleChoicesQuestionMiniItem from './MultipleChoicesQuestionMiniItem'
import PicWordQuestionMiniItem from './PicWordQuestionMiniItem'
import TFChoicesQuestionMiniItem from './TFChoicesQuestionMiniItem'
import WordTableQuestionMiniItem from './WordTableQuestionMiniItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column'
    },
    list: {
        display:'flex',
        flexDirection:'column',
        height: '75vh',
        overflow: 'auto',
        paddingTop: theme.spacing(2)
    },
    item: {
        padding: theme.spacing(1.5),
        paddingTop: theme.spacing(0.6),
        display:'flex',
        flexDirection:'column'
    },
    bottom: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.secondary.main
    }
}))

const MiniQuestionList = (props) => {
    const classes = useStyles()
    const {questionIndex, questions, dispatch, isEditMode} =  useContext(QuestionCreatorContext)
    const handleSelected = (index) => {
        dispatch(selectQuestion(index))
    }

    const handleAddQuestion = () => {
        // dispatch(addQuestion())
        if (props.onAdd) {
            props.onAdd()
        }
    }

    const handleImportTemplate = () => {
        if (props.onImportTemplate) props.onImportTemplate()
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.list} >
            {
                questions.map((item, index) => (
                    <div className = {classes.item} onClick = {()=>handleSelected(index)} 
                        key = {''+index}
                        style={{
                            backgroundColor: questionIndex ===index ? theme.palette.secondary.main:'white'
                        }}>
                        <Typography 
                            variant='label' 
                            sx = {{mb: theme.spacing(0.2), color: '#000'}}>
                            {
                               'Quiz ' + (item.index + 1)
                            }
                        </Typography>
                        {
                            item.typeId ===QUESTION_TYPES_ID.MULTIPLE_CHOICE ? <MultipleChoicesQuestionMiniItem selected = {questionIndex ===index} question = {item}/>
                            : item.typeId ===QUESTION_TYPES_ID.TF_CHOICE ? <TFChoicesQuestionMiniItem selected = {questionIndex ===index} question = {item}/>
                            : item.typeId ===QUESTION_TYPES_ID.PIC_WORD ? <PicWordQuestionMiniItem  selected = {questionIndex ===index} question = {item}/>
                            : item.typeId ===QUESTION_TYPES_ID.WORD_TABLE ? <WordTableQuestionMiniItem  selected = {questionIndex ===index} question = {item}/>
                            : null
                        }
                    </div>
                ))
            }
            </div>
            <Divider />
            {
                isEditMode == false && 
                <div className = {classes.bottom} >
                    <Button 
                        variant = 'primary' 
                        size = 'small' 
                        style = {{ width: theme.spacing(20), alignSelf: 'center'}}
                        onClick = {handleAddQuestion}
                        label = 'New question'/>
                    <Button 
                        variant = 'success'  
                        size = 'small' 
                        onClick = {handleImportTemplate}
                        style = {{marginTop: theme.spacing(2), width: theme.spacing(20), alignSelf: 'center'}}
                        label = 'Import excel'/>
                </div>
            }
          
        </div>
    )
}

export default MiniQuestionList
