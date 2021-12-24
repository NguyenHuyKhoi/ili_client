import { PersonOutline } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MatchPlayContext } from '../../../../../context/match/play/context'
import { theme } from '../../../../../theme'
import { PlayerCard } from '../../../host/lobby/component/Lobby'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'purple',
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
        padding: theme.spacing(1),
        backgroundColor: 'black',
        opacity: 0.4,
        borderRadius: theme.spacing(1)
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
    let {pinCode, title, users} = match
    if (users == undefined) users = []
    
    const handleLeave = () => {
        //leaveMatch(pinCode, dispatch)
        navigate('/match/player/entrance')
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <div className = {classes.playerCount}>
                    <PersonOutline sx = {{color: 'white', fontSize: 30}}/>
                    <Typography variant = 'h6' sx = {{color: 'white', fontWeight: 'bold', ml: theme.spacing(1)}}>6</Typography>
                </div>
                <Typography variant = 'h2' sx = {{fontWeight: 'bold', color: 'white' }}>
                    {title}
                </Typography>
                <div className = {classes.btns}>
                    <Button variant = 'contained' onClick ={handleLeave}>
                        Leave
                    </Button>
                </div>
            </div>
            <div className = {classes.body}>
                <div className = {classes.players}>
                    {
                        users.map((user, index) => (
                            <PlayerCard   key = {''+index} user = {user}/>
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
