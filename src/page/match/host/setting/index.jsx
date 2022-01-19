import { Alert, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/auth/context'
import { GameContext } from '../../../../context/game/other/context'
import { updateLivestreamStage, updateMatch } from '../../../../context/match/play/actions'
import { LIVESTREAM_STAGE, MatchPlayContext, sample_match } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import Header from './component/Header'
import MatchModes, { MODE_MATCH } from './component/MatchModes'
import MatchSetting from './component/MatchSetting'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.secondary.main,
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
        backgroundColor: theme.palette.success.main,
        borderRadius: theme.spacing(1),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
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
            {value: 300, label: '  300 seconds'},
        ],
        title: 'Delay start match on',
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
        title: 'Delay end match on',
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
        
        dispatch(updateMatch({
            ...JSON.parse(JSON.stringify(sample_match)),
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
                socket.emit('match:host', {...match, mode: 'classic'}, (res) => {
                    if (res) {
                        console.log("Created match:", res)
                        dispatch(updateMatch(res))
                        navigate('/match/host/lobby', {replace: true})
                    }
                    else {
                        console.log("Host game failured")
                    }
                })
                break;
            case MODE_MATCH.LIVESTREAM:
                dispatch(updateMatch({
                    ...match,
                    livestream: {
                        title: 'Livestream',
                        description: 'Create by ILI'
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
                <div className = {classes.title}>
                    <Typography variant = 'bigLabel' sx = {{color: '#fff', fontWeight: 'bold'}}>
                        {title}
                    </Typography>
                </div>
               
                <MatchModes onSelectMode = {(mode) => handleStart(mode)}/>
                <MatchSetting/>
            </div>  
        </div>
    )
}

export default MatchHostSettingPage
