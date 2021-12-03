import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import QuestionBuilder from './components/QuestionBuilder'
import QuestionConfig from './components/QuestionConfig'
import QuestionList from './components/QuestionList'
import Topbar from './components/Topbar'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        backgroundColor:'blue',
        overflowY: 'hidden'
    }
}))

const GameCreator = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Topbar/>
            <Grid container sx = {{backgroundColor: 'green'}}>
                <Grid item sm={1.5} >
                    <QuestionList/>
                </Grid>
                <Grid item sm={8}>
                    <QuestionBuilder/>
                </Grid>
                <Grid item sm={2.5}>
                    <QuestionConfig/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameCreator
