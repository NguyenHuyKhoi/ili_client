import { Person, PersonOutline } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetMatch, updateMatch } from '../../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../../context/match/play/context'
import { SocketContext } from '../../../../../context/socket/context'
import { theme } from '../../../../../theme'
import { PlayerCard } from '../../../host/lobby/component/Lobby'

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
        borderRadius: theme.spacing(1),
        backgroundColor: 'black',
        opacity: 0.4,
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
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

const Lobby = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {match, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    let {pinCode, title, players} = match
    if (players == undefined) players = []
    
    const handleLeave = () => {
        console.log("User request to leave")
        socket.emit('match:leave', pinCode, (response) => {
            if (response) {
                dispatch(resetMatch({}))
                navigate('/match/player/entrance', {replace: false})
            }
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
                    <Button variant = 'contained' onClick ={handleLeave}
                        sx  = {{color: 'white', fontWeight: 'bold', textTransform: 'none'}}>
                        Leave
                    </Button>
                </div>
            </div>
            <div className = {classes.body}>
                <div className = {classes.players}>
                    {
                        players.map((player, index) => (
                            <PlayerCard  
                                key = {''+index} 
                                player = {player}  
                                disable = {true}
                                isMe = {player._id == socket.id} />
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
