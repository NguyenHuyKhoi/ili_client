import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/auth/context'
import { updateMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import Header from './component/Header'
import JoinMethodModal from './component/JoinMethodModal'
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

const MatchHostLobbyPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {dispatch, match} = useContext(MatchPlayContext)
    const {user} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)
    const {game, host, pinCode} = match
    const [modal, setModal] = useState({state: ''})
    
    useEffect(() => {
        console.log("Handle with pinCode: ", pinCode)
        socket.emit('match:requireSync', pinCode, (match) => {
            console.log("Update match on require sync : ", match)
            dispatch(updateMatch(match))
        })
        socket.on('match:sync', (match) => {
            console.log("Update on sync : ", match)
            dispatch(updateMatch(match))
        })
        socket.on('match:onQuestion', (match) => {
            console.log("On Question: ", match)
            dispatch(updateMatch(match))
            navigate('/match/host/stadium', {replace: false})
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

export default MatchHostLobbyPage
