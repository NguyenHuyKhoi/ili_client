import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Header from './component/Header'
import Timesup from './component/Timesup'
import BottomBar from './component/BottomBar'
import Correct from './component/Correct'
import Incorrect from './component/Incorrect'
import Question from './component/Question'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    questionContainer: {
        flex: 1
    }
}))

const INPUT_STAGE = {
    ENTER_PIN: 0, 
    ENTER_NAME: 1
}
const MatchHostStadiumPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Header/>
            <Divider/>
            <div className = {classes.questionContainer}>
                <Question/>
            </div>  
            <BottomBar/>
        </div>
    )
}

export default MatchHostStadiumPage
