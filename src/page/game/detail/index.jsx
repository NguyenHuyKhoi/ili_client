import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, {useContext, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import HeaderBar from '../../../component/HeaderBar'
import NotificationModal from '../../../component/NotificationModal'
import { AuthContext } from '../../../context/auth/context'
import { startEditGame } from '../../../context/game/creator/actions'
import { GameCreatorContext } from '../../../context/game/creator/context'
import { selectGame } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import { theme } from '../../../theme'
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
    const {token, user} = useContext(AuthContext)
    const {game} = useContext(GameContext)
    const {dispatch} = useContext(GameCreatorContext)

    const [modal, setModal] = useState({})
    console.log("Game : ", game)
    const handleEdit = () => {
        dispatch(startEditGame(game))
        navigate('/game/creator', {replace: false})
    }

    const handlePlay = () => {
        console.log("Play game")
        navigate('/match/host/setting', {replace: false})
    }

    const handleClone = () => {
        console.log("handle clone: ", token, game._id)
        axios.post('game/clone/' + game._id, null,  {
            headers: {
                'x-access-token': token
            }
        })
        .then((res) => {
            setModal({
                state: 'success',
                title: 'Done !',
                desc: 'This game has been cloned',
                btnLabel: 'OK'
            })
        })   
        .catch((err) => {
            console.log("Err: ", err)
            setModal({
                state: 'success',
                title: 'Error !',
                desc: 'Try again, later',
                btnLabel: 'OK',
                variant: 'error'
            })
        })
    }

    const handleDelete = () => {
        console.log("Token: ", token, game._id)
        axios.delete('game/' + game._id, {
            headers: {
                'x-access-token': token
            }
        })
        .then((res) => {
            setModal({
                state: 'success',
                title: 'Done !',
                desc: 'This game has been deleted',
                btnLabel: 'OK'
            })
        })   
        .catch((err) => {
            console.log("Err: ", err)
            setModal({
                state: 'success',
                title: 'Error !',
                desc: 'Try again, later',
                btnLabel: 'OK',
                variant: 'error'
            })
        })
    }

    const handleDoneModal = () => {
        return navigate(-1)
    }

    const isMine = game.owner != undefined && game.owner._id == user._id
    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <Grid container columnSpacing={5} sx = {{backgroundColor: theme.palette.background.main}}>
                <NotificationModal 
                    title = {modal.title}
                    btnLabel = {modal.btnLabel}
                    desc = {modal.desc}
                    open = { modal.state == 'success' }     
                    onClose = {() => {}}
                    onDone = {handleDoneModal}
                    variant = {modal.variant}/>
                <Grid item xs={3} sx = {{backgroundColor: '#fff'}} >
                    <GameInfor 
                        game = {game} 
                        onEdit = {handleEdit}
                        onPlay = {handlePlay}
                        onClone = {handleClone}
                        onDelete = {handleDelete}
                        isMine = {isMine}/>
                </Grid>
                <Grid item xs={9} sx = {{overflow: 'auto', maxHeight: '90vh'}}>
                    <QuestionList game = {game}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameDetailPage
