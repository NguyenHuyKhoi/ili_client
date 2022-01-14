import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import HeaderBar from '../../../component/HeaderBar'
import { startEditGame } from '../../../context/game/creator/actions'
import { GameCreatorContext } from '../../../context/game/creator/context'
import { selectGame } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import GameInfor from './component/GameInfor'
import QuestionList from './component/QuestionList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const GameDetailPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {game} = useContext(GameContext)
    const {dispatch} = useContext(GameCreatorContext)
    console.log("Game : ", game)
    const handleEdit = () => {
        dispatch(startEditGame(game))
        navigate('/game/creator', {replace: true})
    }

    const handlePlay = () => {
        console.log("Play game")
        navigate('/match/host/setting', {replace: true})
    }
    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <Grid container>
                <Grid item sm={3} >
                    <GameInfor game = {game} onEdit = {handleEdit}
                         onPlay = {handlePlay}/>
                </Grid>
                <Grid item sm={9} sx = {{overflow: 'auto', maxHeight: '90vh'}}>
                    <QuestionList game = {game}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameDetailPage
