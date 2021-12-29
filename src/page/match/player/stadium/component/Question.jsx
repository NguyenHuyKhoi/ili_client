import { Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useState, useContext} from 'react'
import { SocketContext } from '../../../../../context/socket/context'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper/index'
import Answer from '../../../host/stadium/component/Answer'
import {answerStyles} from '../../../../game/creator/component/Answers'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#46178f',
        flexDirection: 'column',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(3)
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7)
    },
    timer: {
        width: theme.spacing(14),
        height:  theme.spacing(14),
        borderRadius:  theme.spacing(7),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaf1fa',
        position: 'absolute',
        left: theme.spacing(2),
        top: 0,
        bottom: 0,
        margin: 'auto'
    },
    img: {
        aspectRatio: 1.6,
        height: 240,
    },
    answers: {
        padding: theme.spacing(1)
    }
}))


const Question = (props) => {
    const classes = useStyles()
    const [selected, setSelected] = useState(null)
    const {socket} = useContext(SocketContext)
    const {question, time} = props
    const {title, image, answers, time_limit} = question
    const handleAnswer = (index) => {
        if (selected != null) return 
        setSelected(index)
        if (props.onAnswer) props.onAnswer(index)

    }
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'h5' sx = {{fontWeight: 600, color: '#333333'}}>
                    {title}
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.timer} >
                    <Typography variant = 'h3' sx = {{fontWeight: 'bold', color: '#333333'}}>
                        {time}
                    </Typography>
                </div>
                {
                    !image ?
                    <img className = {classes.img} src = {createUrl(image)}/>
                    :
                    <div className = {classes.img} />
                }

            </div>
            <div className = {classes.answers} >
                <Grid container columnSpacing = {1.5} rowSpacing = {1.5}>
                    {
                        answers.map((item, index) => (
                            <Grid item xs = {6}   key = {''+index}>
                                <Answer 
                                    style = {answerStyles[index]}
                                    answer = {item} 
                                    onClick = {() => handleAnswer(index)}
                                    isSelected = {selected == index}/>
                            </Grid> 
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default Question
