import { Check, Close, JoinFullSharp, Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import Icon from '../../../../../component/Icon'
import { SocketContext } from '../../../../../context/socket/context'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
import PlayerItem from '../../lobby/component/PlayerItem'


import TopPlayerCard from './TopPlayerCard'


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        position: 'relative',
    },
    topPlayers: {
        display: 'flex',
        height: '40vh',
        position: 'relative'
    },
    players: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        flexFlow: 'wrap',
        padding: theme.spacing(2)
    }
}))

const HallOfFame = (props) => {
    const classes = useStyles()
    const { players } = props 
    const {socket} = useContext(SocketContext)
    console.log("Player num: ", players)

    const otherPlayers = players.length <=3 ? [] : players.slice(3, players.length)

    console.log("Other playere:", otherPlayers.length)
    return (
        <div className = {classes.container}
            style = {{justifyContent: otherPlayers.length > 0 ? 'flex-start' : 'center'}} >
            <div className = {classes.topPlayers}
                style = {{ width: otherPlayers.length > 0 ? '40%' : '50%'}}>
                <TopPlayerCard
                    isBig = {otherPlayers.length > 0 ? false : true}
                    player = {players[0]}
                    style = {{position: 'absolute', top: 0, left: 0, right: 0, margin: 'auto'}}
                    index = {0}/>
                <TopPlayerCard
                    isBig = {otherPlayers.length > 0 ? false : true}
                    player = {players.length >= 2 ? players[1] : null}
                    style = {{position: 'absolute', top: theme.spacing(4), left: 0 }}
                    index = {1}/>
                <TopPlayerCard
                    isBig = {otherPlayers.length > 0 ? false : true}
                    player = {   players.length >= 3 ? players[2] : null}
                    style = {{position: 'absolute', top: theme.spacing(7), right: 0 }}
                    index = {2}/>
            </div>
            {
                (otherPlayers.length > 0) &&
                  <div style = {{
                    width: '60%', height: theme.spacing(2), marginTop: theme.spacing(3), backgroundColor: theme.palette.success.main,
                    border: 'solid 2px #000000',
                    borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px' }}/>
            }
            <div className = {classes.players}>
                {
                    otherPlayers.map((player, index) => (
                        <div style = {{marginLeft: theme.spacing(2)}} key = {'' + index}>
                            <PlayerItem  
                                isMe = {(player._id == socket.id)}
                                player = {player}
                                disable = {true}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default HallOfFame
