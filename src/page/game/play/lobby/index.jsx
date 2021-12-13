import { makeStyles } from '@mui/styles'
import React from 'react'
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

const GameLobbyPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Header/>
            <div className = {classes.body}>
                <Lobby/>
            </div>  
        </div>
    )
}

export default GameLobbyPage
