import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import Header from './component/Header'
import Lobby from './component/Lobby'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.secondary.main,
        overflowY: 'hidden',
    },
    body: {
        flex: 1
    }
}))

const MatchHostLobbyPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {dispatch, match} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const {pinCode} = match
    const [modal, setModal] = useState({state: ''})
    const [alert, setAlert] = useState({})
    const [countdownToStart, setCountdownToStart] = useState(false)
    const [time, setTime] = useState(0)
    useEffect(() => {
        console.log("Handle with pinCode: ", pinCode)
        socket.emit('match:requireSync', pinCode, (match) => {
            console.log("Update match on require sync : ", match)
            dispatch(updateMatch(match))
        })
        socket.on('match:sync', (data) => {
            let {match} = data
            console.log("Update on sync : ", match)
            dispatch(updateMatch(match))
        })
        socket.on('match:onQuestion', (data) => {
            let {match} = data
            console.log("Receive emit On Question: ", match)
            dispatch(updateMatch(match))
            navigate('/match/host/stadium', {replace: true})
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
            setAlert({
                type: 'warning',
                msg: 'Player ' + player.username + ' has kicked out game.'
            })
        })

        socket.on('match:onCountdownToStart', (data) => {
            setCountdownToStart(true)
        })

        socket.on('match:onCountdown', (data) => {
            let {time} = data
            setTime(time)
        })
    }, [])  

    return (
        <div className = {classes.container}>
             <Snackbar open={alert.type !==  undefined} autoHideDuration={2000} onClose={() => setAlert({})}
                    anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                    <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                        {
                            alert.msg
                        }
                    </Alert>
            </Snackbar>
            {/* <JoinMethodModal 
                open = {modal.state == 'join_method'}
                onClose = {() => setModal({})}
            /> */}
            <Header onSelectQR = { () => setModal({state: 'join_method'})}
                showQR = {modal.state !==  'join_method'}/>
            <div className = {classes.body}>
                <Lobby 
                    countdownToStart = {countdownToStart}
                    time = {time}/>
            </div>  
        </div>
    )
}

export default MatchHostLobbyPage
