import { makeStyles } from '@mui/styles'
import React, {useContext, useEffect} from 'react'
import Header from './component/Header'
import Lobby from './component/Lobby'
import {MatchPlayContext} from '../../../../context/match/play/context'
import {GameContext} from '../../../../context/game/other/context'
import {AuthContext} from '../../../../context/auth/context'
import { createMatchAPI } from '../../../../context/match/play/apiCalls'
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
    useEffect(() => {
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
