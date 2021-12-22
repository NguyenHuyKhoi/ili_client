import { makeStyles } from '@mui/styles'
import React, {useContext, useEffect} from 'react'
import Header from './component/Header'
import Lobby from './component/Lobby'
import {MatchPlayContext} from '../../../../context/match/play/context'
import {GameContext} from '../../../../context/game/other/context'
import {AuthContext} from '../../../../context/auth/context'
import { createMatchAPI } from '../../../../context/match/play/apiCalls'
import { joinMatch } from '../../../../context/match/play/socketHandler'
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
    const {game} = useContext(GameContext)
    const {user} = useContext(AuthContext)
    const {pinCode} = match

    useEffect(() => {
        console.log("Join match ")
        joinMatch(pinCode, dispatch)
        return () => {
            
        }
    }, [match.pinCode])

    useEffect(() => {
        createMatchAPI(
            {
                title: game.title,
                gameId: game._id
            },
            user.accessToken,
            dispatch
        )
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

export default MatchHostLobbyPage
