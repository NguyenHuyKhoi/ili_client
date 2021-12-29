import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMatch } from '../../../../context/match/play/actions'
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
        backgroundColor: '#46178f'
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
    const {pinCode} = match
    useEffect(() => {
        socket.emit('match:requireSync', pinCode, (match) => {
            console.log("Get latest match: ", match)
            dispatch(updateMatch(match))
        })
        socket.on('match:sync', (match) => {
            console.log("Receive match on sync: ", match)
            dispatch(updateMatch(match))
        })
        socket.on('match:onQuestion', (match) => {
            dispatch(updateMatch(match))
            navigate('/match/player/stadium', {replace: false})
        })
    }, [])  

    return (
        <div className = {classes.container}>
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
