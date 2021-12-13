import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import HeaderBar from '../../../component/HeaderBar'
import GameInfor from './component/GameInfor'
import QuestionList from './component/QuestionList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const GameDetailPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <Grid container>
                <Grid item sm={3} >
                    <GameInfor/>
                </Grid>
                <Grid item sm={9} sx = {{overflow: 'auto', maxHeight: '90vh'}}>
                    <QuestionList/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameDetailPage
