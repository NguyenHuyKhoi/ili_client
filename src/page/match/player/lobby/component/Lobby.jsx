import { Person } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../../component/Button'
import { resetMatch } from '../../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../../context/match/play/context'
import { SocketContext } from '../../../../../context/socket/context'
import { theme } from '../../../../../theme'
import PlayerItem from '../../../host/lobby/component/PlayerItem'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
    const navigate = useNavigate()
    const {match, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    let {pinCode, game, players, state} = match
    let {title} = game
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

    console.log("Socket Id: ", socket.id)

    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <div className = {classes.playerCount}>
                    <Person sx = {{color: '#000', fontSize: 30}}/>
                    <Typography variant = 'btnLabel' sx = {{color: '#000', fontWeight: 'bold', ml: theme.spacing(1)}}>
                        {players.length}
                    </Typography>
                </div>
                <Typography variant = 'header' sx = {{color: '#000' }}>
                    {'Game: ' + title}
                </Typography>
                <div className = {classes.btns}>
                    <Button 
                        variant = {'warning'}
                        style = {{width: theme.spacing(12) }}
                        size = 'small'
                        onClick = {handleLeave}
                        label = {'Leave'}/>
                </div>
            </div>
            <div className = {classes.body}>
                <div className = {classes.players}>
                    {
                        players.map((player, index) => (
                            <PlayerItem  
                                key = {''+index} 
                                player = {player}  
                                disable = {true}
                                style = {{margin: theme.spacing(1)}}
                                isMe = {player._id == socket.id} />
                        ))
                    }
                </div>
                <div className = {classes.waiting}>
                    <Typography variant = 'btnLabel' sx = {{color: '#000'}} >
                        Waiting for players....
                    </Typography>
                </div>
            </div>
       </div>
    )
}

export default Lobby
