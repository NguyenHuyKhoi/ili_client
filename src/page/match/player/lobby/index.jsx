import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetMatch, updateMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import Header from '../../host/lobby/component/Header'
import JoinMethodModal from '../../host/lobby/component/JoinMethodModal'
import Lobby from './component/Lobby'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        backgroundColor: theme.palette.secondary.main
    },
    body: {
        flex: 1
    }
}))

const MatchPlayerLobbyPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {dispatch, match} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const [modal, setModal] = useState({state: ''})
    const [alert, setAlert] = useState({})
    const {pinCode} = match
    useEffect(() => {
        socket.emit('match:requireSync', pinCode, (match) => {
            console.log("Get latest match: ", match)
            dispatch(updateMatch(match))
        })
        socket.on('match:sync', (data) => {
            let {match} = data
            dispatch(updateMatch(match))
        })
        socket.on('match:onQuestion', (data) => {
            let {match} = data
            console.log("receive emit onQuestion", match)
            dispatch(updateMatch(match))
            navigate('/match/player/stadium', {replace: false})
        })
        socket.on('match:playerLeave', (data) => {
            let {player} = data
            console.log("Player is removed: ", player)
            setAlert({
                type: 'warning',
                msg: 'Player ' + player.username + ' has leave game.'
            })
        })
        socket.on('match:kickPlayerDone', (data) => {
            let {player} = data
            console.log("Player is Kicked: ", player)
            if (player._id == socket.id) {
                dispatch(resetMatch({}))
                navigate('/match/player/entrance', {replace: false})
            }
            else {
                setAlert({
                    type: 'warning',
                    msg: 'Player ' + player.username + ' has kicked out game.'
                })
            }
           
        })
    }, [])  

    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type != undefined} autoHideDuration={2000} onClose={() => setAlert({})}
                    anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                    <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                        {
                            alert.msg
                        }
                    </Alert>
            </Snackbar>
            <JoinMethodModal 
                open = {modal.state == 'join_method'}
                onClose = {() => setModal({})}
            />
            <Header onSelectQR = { () => setModal({state: 'join_method'})}
                showQR = {modal.state != 'join_method'}/>
            <div className = {classes.body}>
                <Lobby/>
            </div>  
        </div>
    )
}

export default MatchPlayerLobbyPage
