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
const Answer = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.answer} >
            <Square sx = {{backgroundColor: 'red',fontSize: 15, color: 'white', p: theme.spacing(0.8), borderRadius: theme.spacing(0.5)}}/>
            <Typography sx = {{flex: 1, mx: theme.spacing(3)}} variant = 'subtitle2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci commodi impedit, nihil quo,
            </Typography>
            <Check  sx = {{ color: 'green'}}/>
        </div>
    )
}

const QuestionList = () => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isShowAll, setIsShowAll] = useState(false)
    const handleShowAllChange = () => {
        setIsShowAll(!isShowAll)
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <Typography variant = 'h6'>Question(15)</Typography>
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
                Array.from(Array(20)).map((_, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <QuestionRowItem isShowAll = {isShowAll}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default QuestionList
