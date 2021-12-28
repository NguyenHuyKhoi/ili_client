import { Check, Square } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { theme } from '../../../../theme'
import QuestionRowItem from './QuestionRowItem'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        backgroundColor: '#f2f2f2',
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
        marginBottom: theme.spacing(2),
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
    const {game} = props
    const {questions} = game
    const [isShowAll, setIsShowAll] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const handleShowAllChange = () => {
        setIsShowAll(!isShowAll)
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}}>
                    {`Question(${questions ? questions.length : 0})`}
                </Typography>
                <div onClick = {handleShowAllChange}>
                    <Typography  variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333', textDecoration: 'underline'}}>
                        {
                            isShowAll?
                            'Hide Answers'
                            :
                            'Show Answers'
                        }
                    </Typography>
                </div>
           
           
            </div>
            <div className = {classes.list} >
            {
                questions.map((item, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <QuestionRowItem 
                            isShowAll = {isShowAll} question = {item} index = {index}
                            selected = {selectedIndex == index}
                            onSelect = {() => setSelectedIndex(index)}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default QuestionList
