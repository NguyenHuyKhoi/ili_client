import { Person } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MatchPlayContext } from '../../../../../context/match/play/context'
import { SocketContext } from '../../../../../context/socket/context'
import { theme } from '../../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(3)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: theme.spacing(0.6)
    },
    players: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(10)
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
        backgroundColor: 'black',
        opacity: 0.7,
        padding: theme.spacing(1),
        marginTop: theme.spacing(10)
    }


}))

export const PlayerCard = (props) => {
    const classes = useStyles()
    const {player,  showScore, disable, isMe} = props 
    
    const {name, score} = player 
    console.log("Is me :", isMe)
    return (
        <div className = {classes.player}
            onClick = {() => {
                if (disable) return 
                if (props.onSelect) props.onSelect()
            }}>
            {
                showScore &&  
                <Typography variant = 'h4' 
                    sx = {{color: 'white', fontWeight: 'bold'}}>
                    {score}
                </Typography>
            }
          
            <Typography variant = 'h6' 
                sx = {{color: 'white', fontWeight: 'bold',"&:hover": {
                    textDecoration: !disable ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}}>
                {name + (isMe ? ' (me) ' : '')}
            </Typography>
        </div>
    )
}

const Lobby = (props) => {
    const classes = useStyles()
    const {countdownToStart, time} = props
    const navigate = useNavigate()
    const {match, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    let {pinCode, title, players, state} = match

    const locked = (state == 'locking')
    const enableStart = (players.length > 0)
    if (players == undefined) players = []

    const handleStart = () => {
        socket.emit('match:start', pinCode)
    }

    const handleLock = () => {
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

    const handleSelectPlayer = (player) => {
        socket.emit('match:kickPlayer', pinCode, player, (ok) => {
            if (ok )
                console.log("Kick successfully")
        })
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <div className = {classes.playerCount}>
                    <Person sx = {{color: '#333333', fontSize: 30}}/>
                    <Typography variant = 'h6' sx = {{color: '#333333', fontWeight: 'bold', ml: theme.spacing(1)}}>
                        {players.length}
                    </Typography>
                </div>
                <Typography variant = 'h2' sx = {{fontWeight: 'bold', color: 'white' }}>
                    {title}
                </Typography>
                <div className = {classes.btns}>
                    <Button 
                        variant = 'contained'   
                        sx = {{
                            fontWeight: 'bold', textTransform: 'none', 
                            backgroundColor: locked ? '#9E9E9E' : 'white',
                            color: locked ? 'white' : '#333333'
                        }}
                        onClick = {handleLock}>
                        Lock
                    </Button>
                    <Button variant = 'contained' 
                        disabled = {!enableStart}
                        sx = {{ml: theme.spacing(2),fontWeight: 'bold', textTransform: 'none'}}
                        onClick = {handleStart}>
                        Start
                    </Button>
                </div>
            </div>
            <div className = {classes.body}>
                <div className = {classes.players}>
                    {
                        players.map((player, index) => (
                            <PlayerCard   
                                key = {''+index} player = {player}
                                disable = {false}
                                showScore = {false}
                                onSelect = {() => handleSelectPlayer(player)}
                                isMe = {false}/>
                        ))
                    }
                </div>
                <div className = {classes.waiting}>
                    <Typography variant = 'h6' sx = {{color: 'white'}} >
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
