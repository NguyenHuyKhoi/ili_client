import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect } from 'react'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { listenUpdateMatch } from '../../../../context/match/play/socketHandler'
import Header from '../../host/lobby/component/Header'
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

const MatchPlayerLobbyPage = () => {
    const classes = useStyles()
    const {dispatch, match} = useContext(MatchPlayContext)
    useEffect(() => {
        listenUpdateMatch(match.pinCode, dispatch)
        return () => {
            
        }
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

export default MatchPlayerLobbyPage
