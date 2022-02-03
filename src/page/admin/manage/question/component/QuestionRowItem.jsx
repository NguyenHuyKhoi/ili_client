import { Check, Close } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import Icon from '../../../../../component/Icon'
import MultiSelect from '../../../../../component/MultiSelect'
import { QUESTION_TYPES_ID } from '../../../../../context/question/creator/context'
import { theme } from '../../../../../theme'
import { createUrl } from '../../../../../util/helper'
import { answerStyles } from '../../../../game/creator/component/Answers'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        overflow: 'hidden',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: theme.spacing(5),
        position: 'relative',

    },
    infor: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        backgroundColor: 'white',
    },  
    time_limit: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.4),
        paddingLeft: theme.spacing(0.6),
        paddingRight: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.8,
        zIndex: 99
    },
    body: {
        flex:1,
        flexDirection: 'column'
    },
    img: {
        height: 120,
        aspectRatio: 1.6,
        alignSelf:'center'
    },
    hintImage: {
        height: 100,
        aspectRatio: 1.6,
        alignSelf:'center',
        marginLeft: theme.spacing(5)
    },
    answer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        padding: theme.spacing(1.5),
        backgroundColor: 'white',
        borderTop: '0.5px solid #f2f2f2'
    }
}))
const Answer = (props) => {
    const classes = useStyles()
    const {answer, correct, style} = props
    const {icon, color} = style
    return (
        <div className = {classes.answer} >
            <Icon 
                name = {icon} 
                style = {{
                    backgroundColor: color,fontSize: 32, color: 'white', 
                    p: theme.spacing(1), borderRadius: theme.spacing(0.4)}}/>
            <Typography sx = {{flex: 1, mx: theme.spacing(3)}} variant = 'btnLabel'>
                {
                    answer
                }
            </Typography>
            {
                correct ? 
                <Check  sx = {{ color: theme.palette.success.main}}/>
                :
                <Close sx = {{ color:  theme.palette.error.main}}/>
            }
        </div>
    )
}
const QuestionRowItem = (props) => {
    const classes = useStyles()
    const {isShowAll, selected, disable} = props
    const [isShow, setIsShow] = useState(false)
    const {question, index} = props
    const {title, image, answers, correct_answer, time_limit, typeName, typeId, images, correct_answers } = question
    const handleShowChange = () => {
        if (disable) return
        setIsShow(!isShow)
        if (props.onSelect) props.onSelect()
    }

    useEffect(() => {
        setIsShow(isShowAll)
        return () => {
            
        }
    }, [isShowAll])

    return (
        <div className = {classes.container} 
            style={{ 
                border: selected ? `2px solid ${theme.palette.success.main}`: '1px solid #000',
                borderRadius: '255px 10px 225px 10px/10px 225px 10px 255px',
            
            }}>
            <div className = {classes.header} onClick = {handleShowChange}>
              
                <div className = {classes.infor}>
                    <Typography variant = 'label'>
                        {`${index + 1} - ${typeName}`}
                    </Typography>
                    <Typography variant = 'bigLabel' sx = {{ color: '#000'}}>
                        {title}
                    </Typography>
                </div>
                {
                    (typeId === QUESTION_TYPES_ID.MULTIPLE_CHOICE || typeId === QUESTION_TYPES_ID.TF_CHOICE) &&
                    <img className = {classes.img} src = {createUrl(image)} alt = 'Hint'/>
                }
                {
                    typeId === QUESTION_TYPES_ID.WORD_TABLE &&
                    <img className = {classes.img} src = {createUrl(null)}  alt = 'Hint'/>
                }
                {
                    typeId === QUESTION_TYPES_ID.PIC_WORD  && images.length > 0 &&
                    <img className = {classes.img} src = {createUrl(images[0])}  alt = 'Hint'/>
                }

                <div className = {classes.time_limit}>
                    <Typography variant = 'caption' sx = {{color: 'white'}}>
                        {time_limit + ' sec'}
                    </Typography>
                </div>
            </div>
            {
                (isShow || disable)  && 
                <div className = {classes.body}>
                    {
                        typeId === QUESTION_TYPES_ID.MULTIPLE_CHOICE || typeId === QUESTION_TYPES_ID.TF_CHOICE ?
                            answers.map((item, index) => (
                                <Answer     
                                    style = {answerStyles[index]}
                                    key = {''+index} 
                                    answer = {item} 
                                    correct = { correct_answer == index }/>
                            ))
                        : typeId === QUESTION_TYPES_ID.PIC_WORD ?
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                padding: theme.spacing(2),
                                paddingLeft: theme.spacing(3)
                            }}>
                                <div style = {{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                    <Typography variant='label' sx = {{color: '#000'}}>
                                        Keyword
                                    </Typography>
                                    <Typography variant='header' sx = {{color: '#000'}}>
                                        {correct_answer}
                                    </Typography>
                                </div>
                                {
                                    images.map((image, imageIndex) => (
                                        <img className = {classes.hintImage} src = {createUrl(image)}
                                            key = {"" + imageIndex}  alt = 'Hint'/>
                                    ))
                                }
                            </div>
                        : typeId === QUESTION_TYPES_ID.WORD_TABLE ? 
                            <MultiSelect
                                label = 'Keywords'
                                selects = {correct_answers}
                                disabled = {true}
                                list = {correct_answers.map((item) => ({
                                    label: item, 
                                    value: item
                                }))}
                                onSelectItem = {(keyword) => {}}
                                onChange = {(selects) => {}}
                                style = {{ backgroundColor: 'white', padding: theme.spacing(2)}}/>
                        : null
                    }
                </div>
            }
           
        </div>
    )
}
export default QuestionRowItem
