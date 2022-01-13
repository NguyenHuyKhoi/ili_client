import { Person } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../../component/Button'
import { MatchPlayContext } from '../../../../../context/match/play/context'
import { SocketContext } from '../../../../../context/socket/context'
import { theme } from '../../../../../theme'
import { BASE_URL } from '../../../../../util/env'
import PlayerItem from './PlayerItem'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    body: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    playerCount: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(5),
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        backgroundColor: theme.palette.success.main,
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
    },
    players: {
        width: '75%',
        height: '52vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
    },
    player: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: theme.spacing(0.6),
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: theme.spacing(0.8),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        margin: theme.spacing(1)

    },
    waiting: {
        alignSelf: 'center',
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.warning.main,
        opacity: 0.7,
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(5),
    }


}))


const Lobby = (props) => {
    const classes = useStyles()
    const {countdownToStart, time} = props
    const navigate = useNavigate()
    const {match, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    let {pinCode, game, players, state} = match
    let {title} = game

    const locked = (state == 'locking')
    const enableStart = (players.length > 0)
    if (players == undefined) players = []

    const handleStart = () => {
        socket.emit('match:start', pinCode)
    }

    const handleLock = () => {
        console.log("Handle lock:", locked)
        if (!locked) {
            socket.emit('match:lock', pinCode, (ok) => {
                if (ok ) console.log("Lock successfully")
                else console.log("Lock failed")
            })
        }
        else {
            socket.emit('match:unlock', pinCode, (ok) => {
                if (ok ) console.log("UnLock successfully")
                else console.log("UnLock failed")
            })
        }
       
    }

    const handleKickPlayer = (player) => {
        socket.emit('match:kickPlayer', pinCode, player, (ok) => {
            if (ok )
                console.log("Kick successfully")
        })
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <div className = {classes.playerCount}>
                    <Person sx = {{color: '#000', fontSize: 30}}/>
                    <Typography variant = 'btnLabel' sx = {{color: '#000', ml: theme.spacing(1)}}>
                        {players.length}
                    </Typography>
                </div>
                <Typography variant = 'header' sx = {{color: '#000' }}>
                    {'Game: ' + title}
                </Typography>
                <div className = {classes.btns}>
                    <Button 
                        variant = {locked ? 'error' : 'warning'}
                        style = {{width: theme.spacing(12) }}
                        size = 'small'
                        onClick = {handleLock}
                        label = {locked ? 'Unlock' : 'Lock'}/>
                    <Button 
                        variant = {enableStart ? 'success' : 'warning' }
                        disabled = {!enableStart}
                        size = 'small'
                        style = {{marginLeft: theme.spacing(2), width: theme.spacing(12) }}
                        label = 'Start'
                        onClick = {handleStart}/>
                </div>
            </div>
            <div className = {classes.body}>
                <div className = {classes.players}>
                    {
                        players.length == 0 ?
                            <Typography variant = 'bigLabel' sx = {{color: '#000', alignSelf: 'center'}}>
                                {`No player join this match. Waiting for them ...`}
                            </Typography>

                        :
                        players.map((player, index) => (
                            <PlayerItem   
                                key = {''+index}
                                player = {player}
                                disable = {false}
                                onKick = {() => handleKickPlayer(player)}
                                style = {{margin: theme.spacing(1)}}
                                isMe = {false}/>
                        ))
                    }
                </div>
                <div className = {classes.waiting}>
                    <Typography variant = 'btnLabel' sx = {{color: '#000'}} >
                        {
                            countdownToStart ?
                            `Game will start on ${time} seconds.`
                            :
                            'Waiting for players....'
                        }
                    </Typography>
                </div>
            </div>
       </div>
    )
}

export default Lobby
