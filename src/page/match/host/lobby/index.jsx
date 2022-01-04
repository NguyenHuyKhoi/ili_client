import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/auth/context'
import { updateMatch } from '../../../../context/match/classic/actions'
import { MatchClassicContext } from '../../../../context/match/classic/context'
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
    const {dispatch, match} = useContext(MatchClassicContext)
    const {user} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)
    const {game, host, pinCode} = match
    const [modal, setModal] = useState({state: ''})
    const [alert, setAlert] = useState({})
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
        socket.on('match:playerLeave', (player) => {
            console.log("Player is removed: ", player)
            setAlert({
                type: 'warning',
                msg: 'Player ' + player.name + ' has leave game.'
            })
        })
        socket.on('match:kickPlayerDone', (player) => {
            console.log("Player is Kicked: ", player)
            setAlert({
                type: 'warning',
                msg: 'Player ' + player.name + ' has kicked out game.'
            })
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

export default MatchHostLobbyPage
