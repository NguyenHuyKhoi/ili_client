import { Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { MatchPlayContext } from '../../../../../context/match/play/context'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
import Answer from './Answer'
import Player from './Player'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: grey[200],
        flexDirection: 'column',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(3)
    }
}))

const QuestionEnd = (props) => {
    const classes = useStyles()
    const {match} = useContext(MatchPlayContext)
    const {users} = match
    const {time} = props 
    return (
        <div className = {classes.container}>
            <Typography variant = 'h6'>
                {'Next question on ' + time}
            </Typography>
            <Grid container columnSpacing={2} rowSpacing={2}>
                {
                    users.map((user, index) => (
                        <Grid item xs = {6}> 
                            <Player user = {user}/>
                        </Grid>
                    ))
                
                }
            </Grid>
       </div>
    )
}

export default QuestionEnd
