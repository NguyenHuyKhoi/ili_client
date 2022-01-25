import { Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { SocketContext } from '../../../../../context/socket/context'
import { theme } from '../../../../../theme'
import PlayerItem from '../../lobby/component/PlayerItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  theme.palette.background.main,
        padding: theme.spacing(1)
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
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        flexFlow: 'wrap',
    }
}))

const Scoreboard = (props) => {
    const classes = useStyles()
    const {socket} = useContext(SocketContext)
    let {players} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'bigHeader' sx = {{color: '#000'}}>
                    Scoreboard
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.players}>
                    {
                        players.map((player, index) => (
                            <div style = {{margin: theme.spacing(1.5)}} key = {'' + index}>
                                <PlayerItem  
                                    isMe = {(player._id === socket.id)}
                                    showScore = {true}
                                    player = {player}
                                    disable = {true}/>
                            </div>
                        ))
                    }
                </div>
             
            </div>
       </div>
    )
}

export default Scoreboard
