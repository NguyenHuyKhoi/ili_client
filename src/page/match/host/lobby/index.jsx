import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../../context/auth/context'
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
        flexDirection: 'column'
    },
    body: {
        flex: 1
    }
}))

const MatchHostLobbyPage = () => {
    const classes = useStyles()
    const {dispatch, match} = useContext(MatchPlayContext)
    const {user} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)
    const {game, host, pinCode} = match
    
    useEffect(() => {
        console.log("Handle with pinCode: ", pinCode)
        socket.emit('match:update', pinCode, (match) => {
            dispatch(updateMatch(match))
        })
        // socket.on('match:update', (match) => {
        //     dispatch(updateMatch(match))
        // })
    }, [])  
    return (
        <div className = {classes.container}>
            <Header />
            <div className = {classes.body}>
                <Lobby/>
            </div>  
        </div>
    )
}

export default MatchHostLobbyPage
