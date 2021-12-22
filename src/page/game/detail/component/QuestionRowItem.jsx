import { Check, Square, TitleOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'

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
        position: 'relative'
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
        padding: theme.spacing(0.5),
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
        height: 100,
        aspectRatio: 1.4,
        alignSelf:'center',
        marginTop: theme.spacing(1)
    },
    answer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        padding: theme.spacing(1.5),
        backgroundColor: 'white',
        borderTop: '0.5px solid gray'
    }
}))
const Answer = (props) => {
    const classes = useStyles()
    const {answer, correct} = props
    console.log("ANswer ", answer, correct)
    return (
        <div className = {classes.answer} >
            <Square sx = {{backgroundColor: 'red',fontSize: 15, color: 'white', p: theme.spacing(0.8), borderRadius: theme.spacing(0.5)}}/>
            <Typography sx = {{flex: 1, mx: theme.spacing(3)}} variant = 'subtitle2'>
                {
                    answer
                }
            </Typography>
            <Check  sx = {{ color: 'green'}}/>
        </div>
    )
}
const QuestionRowItem = (props) => {
    const classes = useStyles()
    const {isShowAll} = props
    const [isShow, setIsShow] = useState(false)
    const {question, index} = props
    const {title, image, answers, correct_answers, time_limit } = question
    const handleShowChange = () => {
        setIsShow(!isShow)
    }

    useEffect(() => {
        setIsShow(isShowAll)
        return () => {
            
        }
    }, [isShowAll])
    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? grey[100]:'white'}}>
            <div className = {classes.header} onClick = {handleShowChange}>
              
                <div className = {classes.infor}>
                    <Typography variant = 'subtitle1'>
                        {`Quiz : ${index}`}
                    </Typography>
                    <Typography variant = 'subtitle1'>
                        {title}
                    </Typography>
                </div>
                <img className = {classes.img} src = {createUrl(image)}/>
                <div className = {classes.time_limit}>
                    <Typography variant = 'subtitle2' sx = {{color: 'white'}}>
                        {time_limit + ' sec'}
                    </Typography>
                </div>
            </div>
            {
                (isShow) &&
                <div className = {classes.answers}>
                    {
                        answers.map((item, index) => (
                            <Answer   key = {''+index} answer = {item} correct = { correct_answers.indexOf(index) != -1 }/>
                        ))
                    }
                </div>
            }
           
        </div>
    )
}
export default QuestionRowItem
