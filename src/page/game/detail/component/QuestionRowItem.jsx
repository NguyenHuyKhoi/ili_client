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
        overflow: 'hidden'
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
    const {title, image, answers, correct_answers, time_limit } = question
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
                        {`${index + 1} - Quiz`}
                    </Typography>
                    <Typography variant = 'bigLabel' sx = {{ color: '#000'}}>
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
                (isShow || disable)  &&
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
