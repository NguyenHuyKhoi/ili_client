import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/auth/context'
import { GameContext } from '../../../../context/game/other/context'
import { updateMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import { theme } from '../../../../theme'
import GameModes from './component/GameModes'
import GameOptions from './component/GameOptions'
import Header from './component/Header'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'purple'
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
    const {dispatch, match} = useContext(MatchPlayContext)
    const {game} = useContext(GameContext)
    const {user, token} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)

    const handleStart = () => {
        let host = {
            _id: user._id,
            name: user.username,
            socketId: socket.id
        }
        socket.emit('match:host', host, game._id, (match) => {
            if (match) {
                navigate('/match/host/lobby')
                console.log("Create match success: ", match)
                dispatch(updateMatch(match))
            }
            else {
                console.log("Host game failured")
            }
        })
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
                    <Button variant = 'contained' color = 'success' sx = {{ml: theme.spacing(5)}}
                        onClick ={handleStart}>
                            Play
                    </Button>
                </div>
               
                <GameModes/>
                <GameOptions/>
            </div>  
        </div>
    )
}

export default MatchHostSettingPage
