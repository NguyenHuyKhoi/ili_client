import { Person, PersonOutline } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext, useState} from 'react'
import { theme } from '../../../../../theme'
import {MatchPlayContext} from '../../../../../context/match/play/context'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../../../../../context/socket/context'
import { updateMatch } from '../../../../../context/match/play/actions'

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
    const {user,  disable} = props 
    
    const {name} = user 
    return (
        <div className = {classes.player}
            onClick = {() => {
                if (disable) return 
                if (props.onSelect) props.onSelect()
            }}>
            <Typography variant = 'h6' 
                sx = {{color: 'white', fontWeight: 'bold',"&:hover": {
                    textDecoration: !disable ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}}>
                {name}
            </Typography>
        </div>
    )
}

const Lobby = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {match, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const [lock, setLock] = useState(false)
    let {pinCode, title, players} = match
    if (players == undefined) players = []

    const handleStart = () => {
        socket.emit('match:start', pinCode)
    }

    const handleLock = () => {
        setLock(!lock)
    }

    const handleSelectPlayer = (user) => {
        console.log("Kick user")
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
                            backgroundColor: lock ? '#9E9E9E' : 'white',
                            color: lock ? 'white' : '#333333'
                        }}
                        onClick = {handleLock}>
                        Lock
                    </Button>
                    <Button variant = 'contained' 
                        sx = {{ml: theme.spacing(2),fontWeight: 'bold', textTransform: 'none'}}
                        onClick = {handleStart}>
                        Start
                    </Button>
                </div>
            </div>
            <div className = {classes.body}>
                <div className = {classes.players}>
                    {
                        players.map((user, index) => (
                            <PlayerCard   key = {''+index} user = {user}
                                disable = {false}
                                onSelect = {() => handleSelectPlayer(user)}/>
                        ))
                    }
                </div>
                <div className = {classes.waiting}>
                    <Typography variant = 'h6' sx = {{color: 'white'}} >
                        Waiting for players....
                    </Typography>
                </div>
            </div>
       </div>
    )
}

export default Lobby
