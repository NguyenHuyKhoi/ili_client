import { Check, Close, Square, TitleOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import Icon from '../../../../component/Icon'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'
import { answerStyles } from '../../creator/component/Answers'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:'gray'
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
        padding: theme.spacing(1),
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
        opacity: 0.4,
        zIndex: 99
    },
    answers: {
        flex:1,
        flexDirection: 'column'
    },
    answer: {
        flex:1,
        backgroundColor: 'white',
        border: '1px solid gray',
        height:7
    },
    img: {
        height: 120,
        aspectRatio: 1.6,
        alignSelf:'center'
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
    console.log("ANswer ", answer, correct)
    return (
        <div className = {classes.answer} >
            <Icon name = {icon} 
                style = {{
                    backgroundColor: color,fontSize: 20, color: 'white', 
                    p: theme.spacing(0.8), borderRadius: theme.spacing(0.4)}}/>
            <Typography sx = {{flex: 1, mx: theme.spacing(3)}} variant = 'h6'>
                {
                    answer
                }
            </Typography>
            {
                correct ? 
                <Check  sx = {{ color: 'green'}}/>
                :
                <Close sx = {{ color: '#E21B3C'}}/>
            }
        </div>
    )
}
const QuestionRowItem = (props) => {
    const classes = useStyles()
    const {isShowAll, selected} = props
    const [isShow, setIsShow] = useState(false)
    const {question, index} = props
    const {title, image, answers, correct_answers, time_limit } = question
    const handleShowChange = () => {
        setIsShow(!isShow)
        if (props.onSelect) props.onSelect()
    }

    useEffect(() => {
        setIsShow(isShowAll)
        return () => {
            
        }
    }, [isShowAll])
    return (
        <div className = {classes.container} style={{ border: selected ? '1.5px solid #1260BE': 'none'}}>
            <div className = {classes.header} onClick = {handleShowChange}>
              
                <div className = {classes.infor}>
                    <Typography variant = 'subtitle1'>
                        {`${index + 1} - Quiz`}
                    </Typography>
                    <Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}}>
                        {title}
                    </Typography>
                </div>
                <img className = {classes.img} src = {createUrl(image)}/>
                <div className = {classes.time_limit}>
                    <Typography variant = 'caption' sx = {{color: 'white'}}>
                        {time_limit + ' sec'}
                    </Typography>
                </div>
            </div>
            {
                (isShow) &&
                <div className = {classes.answers}>
                    {
                        answers.map((item, index) => (
                            <Answer     
                                style = {answerStyles[index]}
                                key = {''+index} 
                                answer = {item} 
                                correct = { correct_answers.indexOf(index) != -1 }/>
                        ))
                    }
                </div>
            }
           
        </div>
    )
}
export default QuestionRowItem
