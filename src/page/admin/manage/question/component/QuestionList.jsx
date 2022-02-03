import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import QuestionRowItem from './QuestionRowItem'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: theme.palette.background.main,
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column',
        marginTop: theme.spacing(2)
    },
    item: {
        marginBottom: theme.spacing(3),
        display:'flex',
        flexDirection:'column'
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
    const {questions} = props
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <Typography variant = 'btnLabel' sx = {{color: '#000'}}>
                    {`Question(${questions ? questions.length : 0})`}
                </Typography>
           
            </div>
            <div className = {classes.list} >
            {
                questions.map((item, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <QuestionRowItem 
                            question = {item} 
                            index = {index}
                            selected = {selectedIndex === index}
                            onSelect = {() => setSelectedIndex(index)}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default QuestionList
