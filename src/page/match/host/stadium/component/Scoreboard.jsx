import { Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
import Answer from './Answer'
import {answerStyles} from '../../../../game/creator/component/Answers'
import AnswerCount from './AnswerCount'
import { PlayerCard } from '../../lobby/component/Lobby'
import { SocketContext } from '../../../../../context/socket/context'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: '#46178f',
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(3)
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7)
    },
    players: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        flexFlow: 'wrap',
    },
    countdown: {
        width: theme.spacing(20),
        borderRadius:  theme.spacing(0.8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaf1fa',
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
    }
}))

const Scoreboard = (props) => {
    const classes = useStyles()
    const {socket} = useContext(SocketContext)
    let {players, time} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'h5' sx = {{fontWeight: 600, color: '#333333'}}>
                    Scoreboard
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.players}>
                    {
                        players.map((player, index) => (
                            <div style = {{marginLeft: theme.spacing(2)}} key = {'' + index}>
                                <PlayerCard  
                                    isMe = {(player._id == socket.id)}
                                    showScore = {true}
                                    player = {player}
                                    disable = {true}/>
                            </div>
                        ))
                    }
                </div>
                <div className = {classes.countdown}>
                    <Typography variant = 'h3' sx = {{color: '#333333', fontWeight: 'bold'}}>
                        {time}
                    </Typography>
                    <Typography variant = 'h5' sx = {{color: '#333333', fontWeight: 'bold'}}>
                        Get ready
                    </Typography>
                </div>
             
            </div>
       </div>
    )
}

export default Scoreboard
