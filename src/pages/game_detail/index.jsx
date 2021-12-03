import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import GameInfor from './components/GameInfor'
import QuestionList from './components/QuestionList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const GameDetail = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            {/* <Topbar/> */}
            <Grid container>
                <Grid item sm={3} >
                    <GameInfor/>
                </Grid>
                <Grid item sm={9}>
                    <QuestionList/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameDetail
