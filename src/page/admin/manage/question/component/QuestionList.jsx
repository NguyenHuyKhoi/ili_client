import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import EmptyBox from '../../../../../component/EmptyBox'
import IconButton from '../../../../../component/IconButton'
import { theme } from '../../../../../theme'
import QuestionRowItem from '../../../../game/detail/component/QuestionRowItem'
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
    const {questions} = props
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleEditItem = (item) => {
        if (props.onEditItem) {
            props.onEditItem(item)
        }
    }

    const handleDeleteItem = (item) => {
        if (props.onDeleteItem) {
            props.onDeleteItem(item)
        }
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <Typography variant = 'btnLabel' sx = {{color: '#000'}}>
                    {`Question(${questions ? questions.length : 0})`}
                </Typography>
           
            </div>
            <div className = {classes.list} >
            {
                questions.length ===0 ? 
                <EmptyBox
                    style= {{width: '100%', marginTop: theme.spacing(5)}}
                    label = " You have not create any questions..."
                    onClick = {() => {
                        if (props.onClickEmpty) props.onClickEmpty()
                    }}/>
                :
                questions.map((item, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <QuestionRowItem 
                            question = {item} 
                            index = {index}
                            selected = {selectedIndex === index}
                            onSelect = {() => setSelectedIndex(index)}/>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: theme.spacing(3)}}>
                            <IconButton icon = 'Edit' variant = 'primary' onClick = {() => handleEditItem(item)}/>
                            <IconButton icon = 'Delete' variant = 'error' style = {{marginTop: theme.spacing(2)}} onClick = {() => handleDeleteItem(item)}/>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default QuestionList
