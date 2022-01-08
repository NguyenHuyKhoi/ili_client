import { Alert, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/auth/context'
import { GameContext } from '../../../../context/game/other/context'
import { resetMatch, updateLivestreamStage, updateMatch } from '../../../../context/match/play/actions'
import { LIVESTREAM_STAGE, MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import Header from './component/Header'
import MatchModes, { MODE_MATCH } from './component/MatchModes'
import MatchSetting from './component/MatchSetting'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#46178f',
        height: '100vh',
        overflow: 'auto'
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

export const MATCH_SETTINGS = [
    {
        key: 'delayStartTime',
        values: [
            {value: 0, label: ' Immediately'},
            {value: 30, label: '  30 seconds'},
            {value: 60, label: '  60 seconds'},
            {value: 120, label: '  120 seconds'},
        ],
        title: 'Start Time after',
    },
    {
        key: 'showQuestionEndTime',
        values: [
            {value: 10, label: '10 seconds'},
            {value: 20, label: '20 seconds'},
            {value: 30, label: '30 seconds'},
        ],
        title: 'Show result of question',
    },
    {
        key: 'showLeaderboardTime',
        values: [
            {value: 10, label: '10 seconds'},
            {value: 20, label: '20 seconds'},
            {value: 30, label: '30 seconds'},
        ],
        title: 'Show leaderboard',
    },
    {
        key: 'delayEndTime',
        values: [
            {value: 0, label: 'immediately'},
            {value: 30, label: '  30 seconds'},
            {value: 60, label: '  60 seconds'},
            {value: 120, label: '  120 seconds'},
        ],
        title: 'End match after',
    },
]

const MatchHostSettingPage = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {match, dispatch} = useContext(MatchPlayContext)
    const {game} = useContext(GameContext)
    const {user, token} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)
    const [alert, setAlert] = useState({})

    useEffect(() => {
        dispatch(resetMatch({
            host: {
                userId: user._id,
                name: user.username
            },
            gameId: game._id,
            game
        }))
        return () => {
            
        }
    }, [])

    const checkSetting = () => {
        let isOk = true 
        console.log("Check setting")
        MATCH_SETTINGS.forEach((item) => {
            console.log("Check setting key:", item.key, match[item.key])
            if (match[item.key] == undefined) isOk = false
        })
        return isOk
    }

    const handleStart = (mode) => {
        if (!checkSetting()) {
            setAlert({
                type: 'error',
                msg: 'Please setting all options below...'
            })
            return
        }

        switch (mode) {
            case MODE_MATCH.CLASSIC: 
                console.log("Host send request to join match:", socket.id)
                socket.emit('match:host', match, (res) => {
                    if (res) {
                        console.log("Created match:", res)
                        dispatch(updateMatch(res))
                        navigate('/match/host/lobby')
                    }
                    else {
                        console.log("Host game failured")
                    }
                })
                break;
            case MODE_MATCH.LIVESTREAM:
                console.log("Init match with livestream:")
                dispatch(updateMatch({
                    livestream: {
                        title: 'Livestream',
                        description: 'Created by ILI...',
                        lobbyTime: 40
                    }
                }))
                dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
                navigate('/match/livestream', {replace: false})
                break
        }

    }

    const {title} = game
    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type != undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
            <Header/>
            <div className = {classes.body}>
                <div className= {classes.bodyHeader} >
                    <div className = {classes.title}>
                        <Typography variant = 'h5' sx = {{color: 'black', fontWeight: 'bold'}}>
                            {title}
                        </Typography>
                    </div>
                </div>
               
                <MatchModes onSelectMode = {(mode) => handleStart(mode)}/>
                <MatchSetting/>
            </div>  
        </div>
    )
}

export default MatchHostSettingPage
