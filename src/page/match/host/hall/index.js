import { Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import { theme } from '../../../../theme'
import HallOfFame from './component/HallOfFrame'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    players: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
    },
    notif: {
        alignSelf: 'center',
        backgroundColor: theme.palette.info.main,
        opacity: 0.7,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
    }
}))

const MatchHostHallPage = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {socket} = useContext(SocketContext)
    const  {match} = useContext(MatchPlayContext)
    const [countdownOnEnd, setCountdownOnEnd] = useState(false)
    const [time, setTime] = useState(0)
    var {players} = match 

    console.log("Players:", match)
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
        return navigate('/match/host/setting', {replace: true})
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'bigHeader' sx = {{color: '#000'}}>
                    Hall Of Fame
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <HallOfFame players = {players}/>
                <Button 
                    variant = 'success' 
                    onClick = {handleNext}
                    label = 'New match'
                    style = {{
                        position: 'absolute',
                        right: theme.spacing(2),
                        top: theme.spacing(2),
                    }}
                />
      
            </div>
            {
                !countdownOnEnd && 
                <div className = {classes.notif}>
                    <Typography variant = 'btnLabel' sx = {{color: '#000'}} >
                        {`Match will end on ${time} seconds.`}
                    </Typography>
                </div>
            }
          
       </div>
    )
}

export default MatchHostHallPage
