import { Button, Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { resetMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import { theme } from '../../../../theme'
import TopPlayerCard from './component/TopPlayerCard'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        backgroundColor: '#46178f',
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
    center: {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7)
    },
    players: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
    },
    notif: {
        alignSelf: 'center',
        borderRadius: theme.spacing(1),
        backgroundColor: 'black',
        opacity: 0.7,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(10)
    }
}))

const MatchHostHallPage = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {socket} = useContext(SocketContext)
    const  {match, dispatch} = useContext(MatchPlayContext)
    const [countdownOnEnd, setCountdownOnEnd] = useState(false)
    const [time, setTime] = useState(0)
    const {players} = match 
    const topPlayers = players.length <= 5 ? players : players.splice(0, 5)

    useEffect(() => {
        socket.on('match:onCountdownToEnd', (data) => {
            setCountdownOnEnd(true)
        })

        socket.on('match:onCountdown', (data) => {
            let {time} = data
            setTime(time)
        })

        socket.on('match:onEndMatch', (data) => {
            console.log("Match is ended")
            setCountdownOnEnd(false)
        })
        return () => {
            
        }
    }, [])
    const handleNext = () => {
        dispatch(resetMatch())
        setTimeout(() => {
            navigate('/match/host/setting')
        }, 500)
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'h4' sx = {{fontWeight: 600, color: 'white'}}>
                    Hall Of Fame
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.players}>
                    {
                        topPlayers.map((player, index) => (
                            <div style = {{}}>
                                <TopPlayerCard player = {player}
                                    highlight = {index == 0}/>
                            </div>
                        ))
                    }
                </div>
                <Button variant = 'contained' 
                    color = 'info'
                    sx = {{
                        fontWeight: 'bold', textTransform: 'none', color: 'white',
                        position: 'absolute',
                        right: theme.spacing(2),
                        top: theme.spacing(2),
                    }}
                    onClick = {handleNext}
                >
                    Host again
                </Button>
             
            </div>
            {
                countdownOnEnd && 
                <div className = {classes.notif}>
                    <Typography variant = 'h6' sx = {{color: 'white'}} >
                        {`Game will end on ${time} seconds.`}
                    </Typography>
                </div>
            }
          
       </div>
    )
}

export default MatchHostHallPage
