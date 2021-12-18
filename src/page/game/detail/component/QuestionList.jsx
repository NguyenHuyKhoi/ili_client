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
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column'
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
    const handleShowAllChange = () => {
        setIsShowAll(!isShowAll)
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <Typography variant = 'h6'>
                    {`Question(${questions ? questions.length : 0})`}
                </Typography>
                <div onClick = {handleShowAllChange}>
                    <Typography variant = 'h6' sx = {{textDecorationLine: 'underline'}}>
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
                        <QuestionRowItem isShowAll = {isShowAll} question = {item} index = {index}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default QuestionList
