import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/auth/context'
import { GameContext } from '../../../../context/game/other/context'
import { updateMatch } from '../../../../context/match/classic/actions'
import { MatchClassicContext } from '../../../../context/match/classic/context'
import { MatchLivestreamContext } from '../../../../context/match/livestream/context'
import { SocketContext } from '../../../../context/socket/context'
import { theme } from '../../../../theme'
import GameModes, { MODE_MATCH } from './component/GameModes'
import GameOptions from './component/GameOptions'
import Header from './component/Header'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#46178f',
        height: '100vh',
        overflow: 'auto'
    },
    body: {
        flex: 1,
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(40),
        paddingRight: theme.spacing(40)
    },
    title: {
        flex: 1,
        padding: theme.spacing(1.5),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}))

const MatchHostSettingPage = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {match} = useContext(MatchClassicContext)
    const dispatchClassic = useContext(MatchClassicContext).dispatch
    const dispatchLivestream = useContext(MatchLivestreamContext).dispatch
    const {game} = useContext(GameContext)
    const {user, token} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)

    const handleStart = (mode) => {
        console.log("Handle start")
        let host = {
            _id: user._id,
            name: user.username,
            socketId: socket.id
        }
        switch (mode) {
            case MODE_MATCH.CLASSIC: 
                socket.emit('match:host', host, game._id, (match) => {
                    if (match) {
                        dispatchClassic(updateMatch(match))
                        navigate('/match/host/lobby')
                    }
                    else {
                        console.log("Host game failured")
                    }
                })
                break;
            case MODE_MATCH.LIVESTREAM:
                let initMatch = {
                    game, 
                    title: 'Livestream',
                    description: 'Created by ILI...'
                }
                dispatchLivestream(updateMatch(initMatch))
                navigate('/match/livestream', {replace: false})
                break
        }

    }

    const {title} = game
    return (
        <div className = {classes.container}>
            <Header/>
            <div className = {classes.body}>
                <div className= {classes.bodyHeader} >
                    <div className = {classes.title}>
                        <Typography variant = 'h5' sx = {{color: 'black', fontWeight: 'bold'}}>
                            {title}
                        </Typography>
                    </div>
                </div>
               
                <GameModes onSelectMode = {(mode) => handleStart(mode)}/>
                <GameOptions/>
            </div>  
        </div>
    )
}

export default MatchHostSettingPage
