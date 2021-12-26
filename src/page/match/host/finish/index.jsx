import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { theme } from '../../../../theme'
import PlayerRank from './component/PlayerRank'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'purple',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex:1,
    },
    titleContainer: {
        padding: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
    },
    list: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(15)
    },
    item: {
        marginBottom: theme.spacing(2)
    },
    actions: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        justifyContent: 'center'
    }
}))

const MatchHostFinishPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {match} = useContext(MatchPlayContext)
    const {host, players} = match

    const handlePlayAgain = () => {
        navigate('/match/host/setting', {replace: false})
    }

    const handleGoHome = () => {
        navigate( '/', {replace: false})
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.header} >
                <div className = {classes.titleContainer}>
                    <Typography variant = 'h6' sx = {{color: 'black', fontWeight: 'bold'}}>
                        Title Game
                    </Typography>
                </div>
            </div>

            <div className= {classes.actions}>
                <Button variant = 'contained' onClick = {handlePlayAgain}>
                    Host again
                </Button>
                <Button variant = 'contained' sx = {{ml: theme.spacing(10)}}
                    onClick = {handleGoHome}>
                    Home
                </Button>
            </div>
            <div className = {classes.body}>
                <div className = {classes.list}>
                    {
                        players.map((player, index) => (
                            <div className = {classes.item}   key = {''+index}>
                                <PlayerRank player = {player} index = {index + 1}/>
                            </div>
                        ))
                    }
                </div>  
            </div>
           
        </div>
    )
}

export default MatchHostFinishPage
